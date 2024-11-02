// Import React and ReactDOM for rendering React components
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/tailwind.css";

// Render the App component inside a React.StrictMode for enhanced error checking
const root= ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // Mounted the app in the HTML element with the id "root"
  document.getElementById("root")
);
