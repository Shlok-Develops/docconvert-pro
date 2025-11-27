import React from 'react';
import './FormatSelector.css';

function FormatSelector({ value, onChange, disabled }) {
  const formats = [
    { value: 'pdf', label: 'PDF' },
    { value: 'docx', label: 'Word (DOCX)' },
    { value: 'pptx', label: 'PowerPoint (PPTX)' },
    { value: 'xlsx', label: 'Excel (XLSX)' },
    { value: 'jpg', label: 'JPG Image' },
    { value: 'png', label: 'PNG Image' }
  ];

  return (
    <div className="format-selector">
      <label>Convert to:</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {formats.map(format => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormatSelector;
