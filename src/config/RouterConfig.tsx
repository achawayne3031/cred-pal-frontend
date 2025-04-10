import { RouterProvider, createBrowserRouter } from "react-router";
import Login from "./../screens/auth/Login";
import Register from "./../screens/auth/Register";
import Layout from "../screens/template/Layout";
import Wallet from "../screens/user/Wallet";

// ✅ Each route has it's own URL
const RouterConfig = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "/", element: <Login /> },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "user",
    element: <Layout />,
    children: [
      { path: "", element: <Wallet /> },
      { path: "wallet", element: <Wallet /> },
    ],
  },
]);

export default RouterConfig;
