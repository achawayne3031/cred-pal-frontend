import React from "react";
import { RouterProvider } from "react-router";
import RouterConfig from "./config/RouterConfig";
import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={RouterConfig} />
    </>
  );
}

export default App;
