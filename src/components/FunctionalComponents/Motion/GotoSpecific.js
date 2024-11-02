// GotoSpecific.js

import React, { useState } from 'react';

const GotoSpecific = ({ onGoToClick }) => {
  const [xSteps, setXSteps] = useState(0);
  const [ySteps, setYSteps] = useState(0);

  const parentContainerStyle = {
    maxWidth: '200px',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const caretIconStyle = {
    fontSize: '10px',
    color: '#808080',
    cursor: 'pointer',
    marginLeft: '3px',
  };

  const handleInputChange = (e, setSteps) => {
    const inputValue = e.target.value;
    if (/^-?\d+$/.test(inputValue)) {
      setSteps(parseInt(inputValue));
    } else {
      setSteps(0);
    }
  };

  const handleIncrement = (setSteps) => {
    setSteps((prevSteps) => prevSteps + 1);
  };

  const handleDecrement = (setSteps) => {
    setSteps((prevSteps) => (prevSteps > 0 ? prevSteps - 1 : 0));
  };

  const handleGoToClick = () => {
    // Implement your logic for moving the sprite to the specified coordinates
    console.log('Go to X:', xSteps, 'Go to Y:', ySteps);

    // Call the provided callback function with the coordinates
    onGoToClick(xSteps, ySteps);
  };

  return (
    <div style={parentContainerStyle}>
      <div className="bg-orange-400 rounded-md p-1 flex items-center">
        <div className="flex items-center">
          <p className="text-white text-xs mr-2">X:</p>
          <input
            id='gotoX'
            type="text"
            placeholder="Enter X Steps"
            className="p-1 rounded-md w-full text-xs border-none"
            value={xSteps}
            onChange={(e) => handleInputChange(e, setXSteps)}
          />
          <span style={caretIconStyle} onClick={() => handleIncrement(setXSteps)}>&#x25B2;</span>
          <span style={caretIconStyle} onClick={() => handleDecrement(setXSteps)}>&#x25BC;</span>
        </div>
        <div className="ml-2 flex items-center">
          <p className="text-white text-xs mr-2">Y:</p>
          <input
            id='gotoY'
            type="text"
            placeholder="Enter Y Steps"
            className="p-1 rounded-md w-full text-xs border-none"
            value={ySteps}
            onChange={(e) => handleInputChange(e, setYSteps)}
          />
          <span style={caretIconStyle} onClick={() => handleIncrement(setYSteps)}>&#x25B2;</span>
          <span style={caretIconStyle} onClick={() => handleDecrement(setYSteps)}>&#x25BC;</span>
        </div>
        
      </div>
    </div>
  );
};

export default GotoSpecific;
