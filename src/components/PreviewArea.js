import React, { useState, useEffect } from "react";
import CatSprite from "./CatSprite";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClone } from "@fortawesome/free-solid-svg-icons";

export default function PreviewArea({ inputValues }) {
  
  const [spriteOptions, setSpriteOptions] = useState([]);
  const [selectedSprite, setSelectedSprite] = useState("1");
  const [history, setHistory] = useState([]);
  const [replayIndex, setReplayIndex] = useState(null);

  const createSprite = () => 
  {
    const newSpriteLabel = `Sprite ${spriteOptions.length + 1}`;
    const newSpriteValue = spriteOptions.length;
    const newSpriteOption = { label: newSpriteLabel, value: newSpriteValue };
    setSpriteOptions([...spriteOptions, newSpriteOption]);
    const isFirstSprite = spriteOptions.length === 0;

 
  if (isFirstSprite) {
   
    const updatedInputValues = 0;
    inputValues(updatedInputValues);
  }
    addToHistory(); 
  };

  const addToHistory = () => {
    // Record the current state of the sprite
    const currentState = {
      spriteOptions: [...spriteOptions],
      selectedSprite: selectedSprite,
    };

    // Add the current state to the history
    setHistory((prevHistory) => [...prevHistory, currentState]);
  };

  const handleReplay = () => {
    // Start replaying from the beginning
    setReplayIndex(0);
  };

  useEffect(() => {
    // If replayIndex is not null, it means we are replaying
    if (replayIndex !== null) {
      // Delay each step for better visualization (adjust the delay as needed)
      const delay = 1000;

      const replayTimer = setInterval(() => {
        // Get the state at the current replayIndex
        const currentState = history[replayIndex];

        // Update the spriteOptions and selectedSprite based on the recorded state
        if (currentState) {
          setSpriteOptions(currentState.spriteOptions);
          setSelectedSprite(currentState.selectedSprite);
        }

        // Move to the next state in the history
        setReplayIndex((prevIndex) =>
          prevIndex < history.length - 1 ? prevIndex + 1 : null
        );
      }, delay);

      // Clean up the interval when replay is complete
      return () => clearInterval(replayTimer);
    }
  }, [replayIndex, history]);

  const handleSpriteChange = (selectedOption) => {
    setSelectedSprite(selectedOption.value);
    addToHistory(); // Record the action in the history
  };

  return (
    <div className=" w-full flex-none h-full overflow-y-auto p-3">
      <div className="p-1 flex items-center">
        <div className=" flex-grow px-2 py-1 mr-2 mt-12 ">
        
         
          <Select
            options={spriteOptions}
            onChange={handleSpriteChange}
            value={spriteOptions.find((option) => option.value === selectedSprite)}
            isClearable={true}
            styles={{ control: (base) => ({ ...base, height: "30px" }) }}
          />
        </div>

        <div>
          <button onClick={createSprite} className="bg-red-400 text-white px-3 py-2 mb-2 ml-4 rounded">
            <FontAwesomeIcon icon={faClone} /> 
          </button>
          <div>
          <button onClick={handleReplay} className="bg-green-400 text-white px-3 py-1 mb-2 rounded ">
            <FontAwesomeIcon icon={faPlay} /> Replay
          </button>
          </div>
        </div>
      </div>

      <div className="sprites mt-4">
        {spriteOptions.map((sprite, index) => (
          <div key={index} className="sprite">
            {index === selectedSprite ? (
              <CatSprite inputValues={inputValues} />
            ) : (
              <CatSprite />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
