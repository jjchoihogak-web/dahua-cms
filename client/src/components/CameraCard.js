import React from 'react';
import { FiGlobe, FiMonitor, FiWifi, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import './CameraCard.css';

const CameraCard = ({ camera, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return '#10b981';
      case 'offline':
        return '#ef4444';
      case 'error':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return '온라인';
      case 'offline':
        return '오프라인';
      case 'error':
        return '오류';
      default:
        return '알 수 없음';
    }
  };

  const handleOpenWebUI = () => {
    // Open Dahua camera web interface in a new tab
    const port = camera.port || 80;
    const url = `http://${camera.publicIpAddress}:${port}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="camera-card">
      <div className="card-header">
        <div className="camera-info">
          <h3 className="camera-hostname">{camera.hostname}</h3>
          <span 
            className="camera-status"
            style={{ backgroundColor: getStatusColor(camera.status) }}
          >
            {getStatusText(camera.status)}
          </span>
        </div>
        <button 
          className="delete-button"
          onClick={() => onDelete(camera.id)}
          title="카메라 삭제"
        >
          <FiTrash2 />
        </button>
      </div>

      <div className="card-body">
        <div className="info-row">
          <div className="info-label">
            <FiGlobe className="info-icon" />
            <span>Public IP</span>
          </div>
          <div className="info-value-group">
            <span className="info-value">{camera.publicIpAddress}</span>
            <button 
              className="web-ui-button"
              onClick={handleOpenWebUI}
              title="웹 UI 열기"
            >
              <FiExternalLink />
            </button>
          </div>
        </div>

        <div className="info-row">
          <div className="info-label">
            <FiWifi className="info-icon" />
            <span>Private IP</span>
          </div>
          <span className="info-value">{camera.privateIpAddress}</span>
        </div>

        <div className="info-row">
          <div className="info-label">
            <FiMonitor className="info-icon" />
            <span>버전</span>
          </div>
          <span className="info-value">{camera.versionNumber}</span>
        </div>

        {camera.model && (
          <div className="info-row">
            <div className="info-label">
              <span>모델</span>
            </div>
            <span className="info-value">{camera.model}</span>
          </div>
        )}

        {camera.serialNumber && (
          <div className="info-row">
            <div className="info-label">
              <span>시리얼 번호</span>
            </div>
            <span className="info-value">{camera.serialNumber}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <span className="last-seen">
          마지막 확인: {formatDistanceToNow(new Date(camera.lastSeen), { 
            addSuffix: true, 
            locale: ko 
          })}
        </span>
      </div>
    </div>
  );
};

export default CameraCard;

