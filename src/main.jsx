import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate 
} from "react-router-dom";
import Login from "./routes/login";
import Success from "./routes/success";
import SideBar from "./routes/layout/sideBar";
import Stock from "./routes/system/stock";
import Predict from "./routes/system/predict";
import Collect from "./routes/system/collect";
import Information from "./routes/system/information";
import Security from "./routes/system/security";
import Verify from "./routes/verify";
import Home from "./routes/home";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },{
    path: "login",
    element: <Login status='login' />,
  },{
    path: "register",
    element: <Login status='register' />,
  },{
    path: "forgetPassword",
    element: <Login status='forgetPassword' />,
  },{
    path: "resetPassword",
    element: <Login status='resetPassword' />,
  },{
    path: "success",
    element: <Success />,
  },{
    path: "verify",
    element: <Verify />,
  },{
    path: "home",
    element: <Home />,
  },{
    path: "system",
    element: <SideBar />,
    children:[
      {
        path:'stock',
        element: <Stock />
      },{
        path:'predict',
        element: <Predict />
      },{
        path:'collect',
        element: <Collect />
      },{
        path:'information',
        element: <Information />
      },{
        path:'security',
        element: <Security />
      }
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
