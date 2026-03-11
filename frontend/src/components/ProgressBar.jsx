import React from 'react';

const ProgressBar = ({ progress, height = "8px", label = true }) => {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div style={{ 
        width: '100%', 
        height: height, 
        backgroundColor: 'var(--border)', 
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: 'linear-gradient(90deg, var(--secondary) 0%, #34d399 100%)',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;
