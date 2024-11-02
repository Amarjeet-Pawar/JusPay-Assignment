import React, { useState } from 'react';

const SetX = ({ value, setValue }) => {
    const [steps, setSteps] = useState(0);
  const parentContainerStyle = {
    maxWidth: '200px',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
  };
  const handleIncrement = () => {
    setSteps(steps + 1);
  };

  const handleDecrement = () => {
    if (steps > 0) {
      setSteps(steps - 1);
    }
  };

  const caretIconStyle = {
    fontSize: '10px',
    color: '#808080',
    cursor: 'pointer',
    marginLeft: '5px',
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^-?\d+$/.test(inputValue)) {
      setValue(parseInt(inputValue));
    } else {
      setValue(0);
    }
  };

  return (
    <div style={parentContainerStyle}>
    <div className="bg-orange-400 rounded-md p-1 flex items-center">
      <p className="text-white text-xs mr-2">Set Y  {" "}</p>
      <div className="flex-1">
        <input
          id='setsize'
          type="text"
          placeholder="Enter Steps"
          className="p-1 rounded-md w-full text-xs border-none"
          value={steps}
          onChange={handleInputChange}
        />
      </div>
      <span style={caretIconStyle} onClick={handleIncrement}>&#x25B2;</span>
      <span style={caretIconStyle} onClick={handleDecrement}>&#x25BC;</span>
    </div>
  </div>
  );
};

export default SetX;
