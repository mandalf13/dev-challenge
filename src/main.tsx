import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./components/detail/Detail";
import Randomizer from "./components/randomizer/Randomizer";
import "./index.scss";

const router = createBrowserRouter([
  { path: "/", element: <Randomizer /> },
  {
    path: "/detail/:titleId",
    element: <Detail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
