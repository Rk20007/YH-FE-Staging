import React from "react";
import { createBrowserRouter } from "react-router-dom";
import CommonElement from "../CommonElement.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonElement />,
    children: [
    //   {
    //     path: "/",
    //     element: <Login />,
    //   }
    ],
  },
]);
