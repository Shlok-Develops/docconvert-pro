import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import FormatSelector from './components/FormatSelector';
import axios from 'axios';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [targetFormat, setTargetFormat] = useState('pdf');
  const [converting, setConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);

  const handleFilesSelected = async (selectedFiles) => {
    const formData = new FormData();
    Array.from(selectedFiles).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        setFiles(prev => [...prev, ...response.data.files.map(f => ({
          ...f,
          status: 'ready'
        }))]);
        setConversionComplete(false);
      }
    } catch (error) {
      alert('Upload failed: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please upload files first');
      return;
    }

    setConverting(true);
    setConversionComplete(false);
    
    try {
      const response = await axios.post('/api/convert', {
        files: files.map(f => ({ id: f.id, originalName: f.originalName })),
        targetFormat
      });

      if (response.data.success) {
        const results = response.data.results;
        setFiles(prev => prev.map(f => {
          const result = results.find(r => r.id === f.id);
          return result ? { ...f, ...result } : f;
        }));
        setConversionComplete(true);
      }
    } catch (error) {
      alert('Conversion failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = async () => {
    const successfulFiles = files.filter(f => f.status === 'success');
    
    if (successfulFiles.length === 0) {
      alert('No files to download');
      return;
    }

    try {
      if (successfulFiles.length === 1) {
        // Single file - direct download with proper filename
        const file = successfulFiles[0];
        const downloadResponse = await axios.post('/api/download/single', {
          convertedName: file.convertedName,
          downloadName: file.downloadName
        }, {
          responseType: 'blob'
        });
        
        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.downloadName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        // Multiple files - ZIP download
        const downloadResponse = await axios.post('/api/download/batch', {
          files: successfulFiles
        }, {
          responseType: 'blob'
        });
        
        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `DocConvert_Pro_Results_${Date.now()}.zip`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      alert('Download failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📄 DocConvert Pro</h1>
        <p>Convert your documents instantly</p>
      </header>

      <main className="main">
        <div className="container">
          <FileUpload onFilesSelected={handleFilesSelected} disabled={converting} />
          
          <FormatSelector 
            value={targetFormat} 
            onChange={setTargetFormat}
            disabled={converting}
          />

          {files.length > 0 && (
            <>
              <FileList 
                files={files} 
                onRemove={handleRemoveFile}
                disabled={converting}
              />
              
              <button 
                className="convert-btn"
                onClick={handleConvert}
                disabled={converting}
              >
                {converting ? 'Converting...' : 'Convert'}
              </button>

              {conversionComplete && (
                <button 
                  className="download-btn"
                  onClick={handleDownload}
                >
                  Download
                </button>
              )}
            </>
          )}

          <section className="how-it-works">
            <h2>How It Works</h2>
            <ol>
              <li>Upload one or more files (drag & drop or click to select)</li>
              <li>Choose your target format</li>
              <li>Click "Convert All"</li>
              <li>Download your converted files automatically</li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
