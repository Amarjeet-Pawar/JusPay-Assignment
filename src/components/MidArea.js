import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function MidArea({
  containers,
  setContainers,
  handleDelete,
  setInputValues,
}) {
  const midAreaStyle = {
    maxHeight: 'calc(100vh - 48px)',
    
    overflowY:"auto",
    scrollBehaviour:"smooth",
  };
  const containerStyle = {
    maxHeight:"calc(100 vh- 8 px)",
    backgroundColor: "#F0F0F0",
    padding: "20px ",
    marginTop:"10px",
    marginLeft:"20px",
    margin: "10px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "300px",
   
    overflowY: "y-auto",
    display: "flex",
    flexDirection: "column",
    scrollBehaviour:"smooth",
  };

  const buttonStyle = {
    backgroundColor: "#ff6666",
    color: "white",
    padding: "4px 8px 4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop:"60px",
    marginLeft:"430px",
  };

  const buttonStyle1 = {
    backgroundColor: "green",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
    marginLeft: "198px",
  };

  const deleteButtonStyle = {
    color: "red",
    cursor: "pointer",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  };

  const addContainer = () => {
    const newContainerId = `container-${containers.length + 1}`;
    setContainers([...containers, { id: newContainerId, items: [] }]);
  };

  const [currentContainerId, setCurrentContainerId] = useState(null);
  const [newValues, setNewValues] = useState({});

  const handleRunClick = (containerId) => {
    setCurrentContainerId(containerId);

    if (!newValues[containerId]) {
      newValues[containerId] = [];
    }

    getInputValues(containerId);
    setInputValues(newValues[containerId]);
  };

  function getInputValues(containerId) {
    console.log("containerId", `#${containerId}`);

    newValues[containerId] = [];

    document.querySelectorAll(`#${containerId} .graybox`).forEach((graybox) => {
      const inputs = graybox.querySelectorAll("input");
      inputs.forEach((input) => {
        let n = 0;
        if (input.type === "text") {
          if (input.id === "repeat") {
            n = input.value;
          }

          if (input.type === "text" && input.id === "repeat") {
            for (let i = 0; i < n; i++) {
              newValues[containerId].push({
                key: `${input.id}${i}`,
                value: parseFloat(input.value),
              });
            }
          } else if (!isNaN(input.value)) {
            newValues[containerId].push({
              key: `${input.id}`,
              value: parseFloat(input.value),
            });
          } else {
            newValues[containerId].push({
              key: `${input.id}`,
              value: input.value,
            });
          }
        } else if (input.type === "number") {
          newValues[containerId].push({
            key: `${input.id}`,
            value: parseFloat(input.value),
          });
        }
      });
    });

    console.log(
      "Input values for container",
      containerId,
      newValues[containerId]
    );
  }

  return (
    <div style={midAreaStyle} className=" flex-2 flex-col">
   
      <div>
      {console.log(containers)}
      <button style={buttonStyle} onClick={addContainer}>
        <FontAwesomeIcon icon={faPlus} />
        
      </button>
      </div>
      {containers.map((container) => (
        <Droppable
          key={container.id}
          droppableId={container.id}
          type="sidearea"
        >
          {(provided) => (
            <ul
              id={container.id}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ ...containerStyle, maxWidth: "100%" }}
            >
              <button
                style={buttonStyle1}
                onClick={() => handleRunClick(container.id)}
              >
                {" "}
                <FontAwesomeIcon icon={faPlay} />
                Run
              </button>
              {container.items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div className="graybox" style={{ display: "flex" }}>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ flex: 1 }}
                      >
                        {getComponent(item.split("-")[0])}
                      </div>
                      <span
                        style={deleteButtonStyle}
                        onClick={() => handleDelete(container.id, index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      ))}
    </div>
  );
}
