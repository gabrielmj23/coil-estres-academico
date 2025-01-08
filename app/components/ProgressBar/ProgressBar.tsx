import React from 'react';
import './ProgressBar.css';


interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <progress className="progress-bar" value={progress} max="100" />
    </div>
  );
};

export default ProgressBar;