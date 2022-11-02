import React from "react";
import MainPage from "./pages/main/Main";
import { BrowserRouter } from "react-router-dom";

import { ServiceProvider } from "./hooks/service";

import "./App.css";

function App() {
  return (
    <ServiceProvider>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </ServiceProvider>
  );
}

export default App;
