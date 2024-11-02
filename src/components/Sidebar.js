import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getComponent } from './getComp';
import {
  motionComponents,
  
} 
from "./sidebarcomponents";

const renderComponentList = (components) => {
  return components.map((item, index) => (
    <Draggable
      key={`${item}-sideArea`}
      draggableId={`${item}-sideArea`}
      index={index}
      type="container-1"
    >
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {getComponent(item)}
        </ul>
      )}
    </Draggable>
  ));
};

const Sidebar = () => {
  const sidebarStyle = {
    maxHeight: 'calc(100vh - 8px)',
    
  };

  return (
    <div
      style={sidebarStyle}
      className="w-60 flex-none h-full overflow-hidden flex flex-col items-start p-2 border-r border-gray-200"
    >
     
     {motionComponents.length > 0 && (
        <Droppable droppableId="container-1" type="container-1">
          {(provided) => (
            <div className="my-3" id='1'>
              <p className="text-gray-600 font-semibold">Motion Animation</p>
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="sidearea"
              >
                {renderComponentList(motionComponents)}
              </ul>
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default Sidebar;
