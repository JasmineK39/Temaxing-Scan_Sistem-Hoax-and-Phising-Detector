import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "@/pages/Home";
import LoginPage from "@/components/Login";     
import SignUpPage from "@/components/SignUp";  

import PrivateRoute from "@/components/PrivateRoute"; 

import AdminLayout from "@/layouts/admin-layout";
import AdminDashboard from "@/pages/dashboard-admin/AdminDashboard";
import UserManagement from "@/pages/dashboard-admin/UserManagement";
import UserHistoryManagement from "@/pages/dashboard-admin/UserHistoryManagement";

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
      <PrivateRoute allowedRoles={["user"]}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "phishing", element: <Phishing /> },
      { path: "fake-news", element: <FakeNews /> },
      { path: "history", element: <History /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <UserManagement /> },
      { path: "user-history", element: <UserHistoryManagement /> },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);