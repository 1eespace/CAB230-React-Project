import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// components
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";

// pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PersonalDetail from "./components/PersonalDetail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <div className="App">
          <Header onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/data/:imdbID" element={<MovieDetail />} />
            <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/people/:id" element={<PersonalDetail />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
