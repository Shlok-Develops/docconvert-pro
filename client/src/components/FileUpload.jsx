import React, { useRef, useState } from 'react';
import './FileUpload.css';

function FileUpload({ onFilesSelected, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`file-upload ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
        disabled={disabled}
      />
      <div className="upload-icon">📁</div>
      <h3>Drag & Drop Files Here</h3>
      <p>or click to select files</p>
      <small>Supported: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG, TXT</small>
    </div>
  );
}

export default FileUpload;
