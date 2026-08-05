//MAYBE UNUSED
//Router mengikuti router/router.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import Home from "./pages/Home"; 
import PrivateRoute from "./components/PrivateRoute"; 
import ThemeWrapper from "./ThemeWrapper";

function App() {
  return (
    <BrowserRouter>
      <ThemeWrapper>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Login & Register */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <h1 className="text-foreground">Dashboard</h1>
              </PrivateRoute>
            } 
          />
          
          {/* Redirect jika path tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeWrapper>
    </BrowserRouter>
  );
}

export default App;