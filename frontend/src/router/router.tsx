import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "@/pages/Home";
import LoginPage from "@/components/Login";     
import SignUpPage from "@/components/SignUp";  
import PrivateRoute from "@/components/PrivateRoute"; 

import DashboardLayout from "@/layouts/dashboard-layout";

import Dashboard from "@/pages/dashboard/Dashboard";
import Phishing from "@/pages/dashboard/Phishing";
import FakeNews from "@/pages/dashboard/FakeNews";
import History from "@/pages/dashboard/History";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "phishing",
        element: <Phishing />,
      },
      {
        path: "fake-news",
        element: <FakeNews />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);