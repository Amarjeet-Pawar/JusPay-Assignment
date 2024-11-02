import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from"./components/Navbar";
import { faCog, faFile, faEdit, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
// import Hide from "./components/FunctionalComponents/Looks/Hide";
import CatSprite from "./components/CatSprite";

export default function App() {
 

  const [repeatCount, setRepeatCount] = useState(1);

  const handleRepeatChange = (count) => {
    setRepeatCount(count);
  };
  const [containers, setContainers] = useState([
    {
      id: "container-1",
      items: [],
    },
  ]);
  const [isHidden, setIsHidden] = useState(true);
 const toggleHide=()=>{
  setIsHidden((prevIsHidden)=>!prevIsHidden);
 }
 
  const [inputValues, setInputValues] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceContainerId = result.source.droppableId;
    const destinationContainerId = result.destination.droppableId;
    const draggableId = result.draggableId.split("-")[0];

    const updatedContainers = containers.map((container) => {
      if (container.id === destinationContainerId) {
        return {
          ...container,
          items: [
            ...container.items,
            `${draggableId}-${container.items.length}`,
          ],
        };
      }
      return container;
    });

    setContainers(updatedContainers);
  };

  const handleDelete = (containerId, index) => {
    const container = containers.find((c) => c.id === containerId);

    if (container && container.items.length > index) {
      container.items.splice(index, 1);
      setContainers([...containers]);
    }
  };
 

  return (
    <Router>
    <div className="bg-white-100 overflow-hidden font-sans h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-purple-500 text-white flex justify-between items-center ">
      <img src={process.env.PUBLIC_URL + '/icons/logo.png'} alt="Your Logo" className="h-8" />
      
      
          <div style={{ flexGrow: 1 }}>
      <div style={{ backgroundColor: '#3f51b5', padding: '10px 16px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h6 style={{ margin: 0 }}>MIT Scratch Assignment</h6>
          <button 
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => window.location.href = "https://github.com/Amarjeet-Pawar"}
          >
            GitHub
            <span style={{ marginLeft: '8px', fontSize: '20px', height:'30px', width:'30px' }}><img src='/icons/image.png'></img></span> {/* Cat Emoji for GitHub Icon */}
          </button>
        </div>
      </div>
    </div>
      </nav>
      

      
      {/* Main Content */}
      <div className="fixed w-full top-12 flex-1 flex flex-row">
        {/* Left Section */}
        <div className="flex-1 overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          
          <DragDropContext onDragEnd={handleDragEnd}>
          <Navbar/>
     
            <Sidebar />
           
            <MidArea
              containers={containers}
              setContainers={setContainers}
              handleDelete={handleDelete}
              setInputValues={setInputValues}
            />
          </DragDropContext>
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea inputValues={inputValues} />
          {/* <Hide toggleHide={toggleHide} /> */}
      <CatSprite />
        </div>
      </div>
    </div>
    </Router>
  );
}
