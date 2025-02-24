import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from './Login'
import Browse from './Browse'
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";

const Body = () => {
  
  // const navigate = useNavigate();
  // Router creation
  const appRouter= createBrowserRouter([
    {
      path:"/",
      element:<Login/>,
    },
    {
      path:"/browse",
      element:<Browse/>,
    },
  ]);

  
  return (
    // Router provider
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
