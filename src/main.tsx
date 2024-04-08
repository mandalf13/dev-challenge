import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./components/detail/Detail";
import Randomizer from "./components/randomizer/Randomizer";
import { store } from "./redux/store";
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
