import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// TODO #13
// Afegeix un altre `import` perquè també es carreguin els estils (ja proporcionats en un arxiu .css) per la barra de navegació.
import "./navbar.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Treiem intencionadament StrictMode per evitar doble renderitzat, ja que API només permet una crida cada 5 segons.
root.render(<App />);
