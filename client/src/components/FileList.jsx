import React from 'react';
import './FileList.css';

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const icons = {
    pdf: '📕',
    doc: '📘', docx: '📘',
    ppt: '📙', pptx: '📙',
    xls: '📗', xlsx: '📗',
    jpg: '🖼️', jpeg: '🖼️', png: '🖼️',
    txt: '📄'
  };
  return icons[ext] || '📄';
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

function FileList({ files, onRemove, disabled }) {
  return (
    <div className="file-list">
      {files.map(file => (
        <div key={file.id} className={`file-item ${file.status}`}>
          <div className="file-icon">{getFileIcon(file.originalName)}</div>
          <div className="file-info">
            <div className="file-name">{file.originalName}</div>
            <div className="file-size">{formatFileSize(file.size)}</div>
          </div>
          <div className="file-status">
            {file.status === 'ready' && '⏳'}
            {file.status === 'success' && '✅'}
            {file.status === 'error' && '❌'}
          </div>
          {file.status === 'ready' && (
            <button
              className="remove-btn"
              onClick={() => onRemove(file.id)}
              disabled={disabled}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default FileList;
