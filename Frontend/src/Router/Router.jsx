import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import About from "../Pages/About";
import YourLoan from "../Pages/YourLoan";
import LoanDashboard from "../Pages/LoanDashboard";

const router = createBrowserRouter([
    {
      path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/your-loan", element: <YourLoan /> },
            { path: "/about-us", element: <About /> },
            { path: "/admin", element: <LoanDashboard /> },
        ]
    },
    {
      path: "/Login",
      element: <Login />
    },
    {
      path: "/Signup",
      element: <Signup />
    }
  ]);

  export default router 