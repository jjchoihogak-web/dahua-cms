const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Camera = sequelize.define('Camera', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    publicIpAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true
      },
      field: 'public_ip_address'
    },
    privateIpAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true
      },
      field: 'private_ip_address'
    },
    versionNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'version_number'
    },
    macAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'mac_address'
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'serial_number'
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 80
    },
    status: {
      type: DataTypes.ENUM('online', 'offline', 'error'),
      defaultValue: 'online'
    },
    lastSeen: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'last_seen'
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    }
  }, {
    tableName: 'cameras',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['public_ip_address']
      },
      {
        fields: ['hostname']
      },
      {
        fields: ['status']
      }
    ]
  });

  return Camera;
};

