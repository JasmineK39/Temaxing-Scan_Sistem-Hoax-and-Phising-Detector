import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";

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
    path: "/dashboard",
    element: <DashboardLayout />,
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
]);