import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";

// function PrivateRoute({ children, role }: { children: JSX.Element; role: "user" | "admin" }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   if (user.role !== role) return <Navigate to="/" replace />;
//   return children;
// }

function PrivateRoute({ children, role }: { children: React.ReactNode; role: "user" | "admin" }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>
        {/* <nav className="flex gap-4 p-4 bg-gray-200">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <PrivateRoute role="admin">
              <Admin />
            </PrivateRoute>
          } />
        </Routes> */}


        <Navbar />
        <div className="p-6 mt-5">


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
