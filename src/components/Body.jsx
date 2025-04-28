import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";

const Body = () => {
  // Create a router for the application
  // Define the routes for the application
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    // Router provider
    <div className="bg-black scrollbar-hide">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
