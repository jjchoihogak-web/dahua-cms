import React from 'react';
import CameraCard from './CameraCard';
import './CameraList.css';

const CameraList = ({ cameras, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>카메라 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (cameras.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📹</div>
        <h2>등록된 카메라가 없습니다</h2>
        <p>다후아 카메라의 Auto Registration 기능을 활성화하여 자동으로 등록하세요.</p>
      </div>
    );
  }

  return (
    <div className="camera-list">
      <div className="camera-stats">
        <div className="stat-item">
          <span className="stat-label">전체 카메라</span>
          <span className="stat-value">{cameras.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">온라인</span>
          <span className="stat-value online">
            {cameras.filter(c => c.status === 'online').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">오프라인</span>
          <span className="stat-value offline">
            {cameras.filter(c => c.status === 'offline').length}
          </span>
        </div>
      </div>

      <div className="camera-grid">
        {cameras.map(camera => (
          <CameraCard
            key={camera.id}
            camera={camera}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CameraList;

