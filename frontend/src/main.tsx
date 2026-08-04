import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import ThemeWrapper from './ThemeWrapper.tsx'


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeWrapper>
      <RouterProvider router={router} />
    </ThemeWrapper>
  </StrictMode>,
);
