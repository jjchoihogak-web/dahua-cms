import React, { useState, useEffect } from 'react';
import './App.css';
import CameraList from './components/CameraList';
import Header from './components/Header';
import api from './services/api';

function App() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchCameras = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await api.getCameras(params);
      setCameras(response.data);
    } catch (err) {
      setError('카메라 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching cameras:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCameras();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchCameras, 30000);
    return () => clearInterval(interval);
  }, [searchTerm, statusFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('이 카메라를 삭제하시겠습니까?')) {
      try {
        await api.deleteCamera(id);
        fetchCameras();
      } catch (err) {
        alert('카메라 삭제에 실패했습니다.');
        console.error('Error deleting camera:', err);
      }
    }
  };

  return (
    <div className="App">
      <Header 
        onRefresh={fetchCameras}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <main className="main-content">
        <div className="container">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <CameraList 
            cameras={cameras}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

