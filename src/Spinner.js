import React from 'react';
import './App.css'; // Import the CSS file for styling


export default function Spinner() {
    return <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>;
  }