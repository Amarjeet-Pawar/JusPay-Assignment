import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const TurnAnti = ({}) => {
  const [steps, setSteps] = useState(0);

  const handleIncrement = () => {
    setSteps(steps + 1);
  };

  const handleDecrement = () => {
    if (steps > 0) {
      setSteps(steps - 1);
    }
  };

  const caretIconStyle = {
    fontSize: '14px', // Adjust the size as needed
    color: '#808080', // Grey color
    cursor: 'pointer',
  };

  const parentContainerStyle = {
    maxWidth: '200px',
    margin: '10px',
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (!isNaN(inputValue)) {
      setSteps(inputValue);
    } else {
      setSteps(0);
    }
  };

  return (
    <div style={parentContainerStyle}>
      <div className="bg-blue-400 rounded-md p-1 flex items-center">
        <p className="text-white text-xs mr-2">Turn <FontAwesomeIcon icon={faUndo} size="lg" color="grey" /> {" "}</p>
        <div className="flex-1">
          <input
            id='turnanti'
            type="text"
            placeholder="Enter Steps"
            className="p-1 rounded-md w-full text-xs border-none"
            value={steps}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col ml-2">
          <FontAwesomeIcon icon={faCaretUp} onClick={handleIncrement} style={caretIconStyle} />
          <FontAwesomeIcon icon={faCaretDown} onClick={handleDecrement} style={caretIconStyle} />
        </div>
      </div>
    </div>
  );
};

export default TurnAnti;
