import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from './Login'
import Browse from './Browse'

const Body = () => {
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
