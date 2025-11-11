const express = require('express');
const { body, validationResult } = require('express-validator');
const { Camera } = require('../models');

const router = express.Router();

// Validation middleware
const validateCamera = [
  body('hostname').notEmpty().trim().withMessage('Hostname is required'),
  body('publicIpAddress').isIP().withMessage('Valid public IP address is required'),
  body('privateIpAddress').isIP().withMessage('Valid private IP address is required'),
  body('versionNumber').notEmpty().trim().withMessage('Version number is required'),
  body('port').optional().isInt({ min: 1, max: 65535 }).withMessage('Port must be between 1 and 65535')
];

// GET all cameras
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { hostname: { [Op.iLike]: `%${search}%` } },
        { publicIpAddress: { [Op.iLike]: `%${search}%` } },
        { privateIpAddress: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const cameras = await Camera.findAll({
      where,
      order: [['lastSeen', 'DESC']]
    });

    res.json({
      success: true,
      count: cameras.length,
      data: cameras
    });
  } catch (error) {
    console.error('Error fetching cameras:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cameras'
    });
  }
});

// GET single camera by ID
router.get('/:id', async (req, res) => {
  try {
    const camera = await Camera.findByPk(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        error: 'Camera not found'
      });
    }

    res.json({
      success: true,
      data: camera
    });
  } catch (error) {
    console.error('Error fetching camera:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch camera'
    });
  }
});

// POST - Auto registration endpoint (Dahua cameras will call this)
router.post('/register', validateCamera, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      hostname,
      publicIpAddress,
      privateIpAddress,
      versionNumber,
      macAddress,
      model,
      serialNumber,
      port,
      metadata
    } = req.body;

    // Check if camera already exists by public IP
    let camera = await Camera.findOne({
      where: { publicIpAddress }
    });

    if (camera) {
      // Update existing camera
      camera = await camera.update({
        hostname,
        privateIpAddress,
        versionNumber,
        macAddress,
        model,
        serialNumber,
        port: port || 80,
        status: 'online',
        lastSeen: new Date(),
        metadata: metadata || {}
      });

      return res.json({
        success: true,
        message: 'Camera updated successfully',
        data: camera,
        isNew: false
      });
    } else {
      // Create new camera
      camera = await Camera.create({
        hostname,
        publicIpAddress,
        privateIpAddress,
        versionNumber,
        macAddress,
        model,
        serialNumber,
        port: port || 80,
        status: 'online',
        lastSeen: new Date(),
        metadata: metadata || {}
      });

      return res.status(201).json({
        success: true,
        message: 'Camera registered successfully',
        data: camera,
        isNew: true
      });
    }
  } catch (error) {
    console.error('Error registering camera:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register camera',
      details: error.message
    });
  }
});

// PUT - Update camera
router.put('/:id', validateCamera, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const camera = await Camera.findByPk(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        error: 'Camera not found'
      });
    }

    await camera.update(req.body);

    res.json({
      success: true,
      message: 'Camera updated successfully',
      data: camera
    });
  } catch (error) {
    console.error('Error updating camera:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update camera'
    });
  }
});

// DELETE camera
router.delete('/:id', async (req, res) => {
  try {
    const camera = await Camera.findByPk(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        error: 'Camera not found'
      });
    }

    await camera.destroy();

    res.json({
      success: true,
      message: 'Camera deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting camera:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete camera'
    });
  }
});

// POST - Heartbeat endpoint (for cameras to update their status)
router.post('/:id/heartbeat', async (req, res) => {
  try {
    const camera = await Camera.findByPk(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        error: 'Camera not found'
      });
    }

    await camera.update({
      status: 'online',
      lastSeen: new Date()
    });

    res.json({
      success: true,
      message: 'Heartbeat received'
    });
  } catch (error) {
    console.error('Error updating heartbeat:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update heartbeat'
    });
  }
});

module.exports = router;

