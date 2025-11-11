import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  // Get all cameras
  getCameras: (params = {}) => {
    return api.get('/cameras', { params }).then(res => res.data);
  },

  // Get single camera
  getCamera: (id) => {
    return api.get(`/cameras/${id}`).then(res => res.data);
  },

  // Register camera (auto registration)
  registerCamera: (cameraData) => {
    return api.post('/cameras/register', cameraData).then(res => res.data);
  },

  // Update camera
  updateCamera: (id, cameraData) => {
    return api.put(`/cameras/${id}`, cameraData).then(res => res.data);
  },

  // Delete camera
  deleteCamera: (id) => {
    return api.delete(`/cameras/${id}`).then(res => res.data);
  },

  // Send heartbeat
  sendHeartbeat: (id) => {
    return api.post(`/cameras/${id}/heartbeat`).then(res => res.data);
  },
};

export default apiService;

