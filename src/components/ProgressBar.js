import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import '../styles/ProductivityPage.css';

const ProgressBar = ({ value }) => {
  return (
    <CircularProgressbar
      value={value}
      text={`${Math.round(value)}%`}
      styles={buildStyles({
        textColor: '#fff',
        pathColor: '#E878A7',
        trailColor: '#d6d6d6',
      })}
    />
  );
};

export default ProgressBar;
