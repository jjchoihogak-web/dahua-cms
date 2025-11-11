import React from 'react';
import { FiRefreshCw, FiSearch } from 'react-icons/fi';
import './Header.css';

const Header = ({ onRefresh, searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">
            <span className="title-icon">📹</span>
            Dahua CMS
          </h1>
          <p className="header-subtitle">Camera Management System</p>
        </div>

        <div className="header-right">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="카메라 검색 (호스트명, IP 주소)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">전체 상태</option>
            <option value="online">온라인</option>
            <option value="offline">오프라인</option>
            <option value="error">오류</option>
          </select>

          <button onClick={onRefresh} className="refresh-button" title="새로고침">
            <FiRefreshCw />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

