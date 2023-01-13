import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { createRoot } from "react-dom/client";
import App from './components/App';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
