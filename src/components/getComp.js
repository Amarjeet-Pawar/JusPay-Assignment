import React from "react";
import MoveX from "./FunctionalComponents/Motion/MoveX";
import MoveY from "./FunctionalComponents/Motion/MoveY";

import TurnAnti from "./FunctionalComponents/Motion/TurnAnti";
import TurnClock from "./FunctionalComponents/Motion/TurnClock";

import GotoSpecific from "./FunctionalComponents/Motion/GotoSpecific";
import SetX from "./FunctionalComponents/Motion/setX";
import SetY from "./FunctionalComponents/Motion/setY";


export const getComponent = (key, id) => {
  switch (key) {
    case "MOVEX":
      return <MoveX />;
    case "MOVEY":
      return <MoveY />;
    
    case "TurnClock":
      return <TurnClock />;
    case "TurnAnti":
      return <TurnAnti />;
    
    case "GotoSpecific":
        return <GotoSpecific/>;
    case "SetX":
        return <SetX/>;
    case "SetY":
        return <SetY/>;
   
           
  }
};
