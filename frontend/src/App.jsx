import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Send from "./pages/Send";
// import Navbar from "./components/Navbar";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute component={<Dashboard />} />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/send",
      element: <ProtectedRoute component={<Send />} />,
    },
  ]);

  function ProtectedRoute({ component }) {
    const userId = localStorage.getItem("userId");
    return userId ? component : <Navigate to="/signin" />;
  }

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
