import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { 
  Collapse, 
  Nav, 
  Navbar, 
  NavItem, 
  NavbarText,
  NavbarToggler
} from "reactstrap";
import axios from "axios";
import jwtDecode from "jwt-decode";


const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the token exists and is not expired
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
    
      if (decodedToken.exp > currentTime) {
        setIsAuthenticated(true);
      } else {
        // Send a request to refresh the token
        axios.post("/user/refresh", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.log(error);
          setIsAuthenticated(false);
        });
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload(false);
  };

  return (
    <Navbar className="navigation-bar" color="dark" dark expand="md">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink className="NavLink-item" tag={NavLink} to="/" exact>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="NavLink-item" tag={NavLink} to="/movies">
              Movies
            </NavLink>
          </NavItem>
        </Nav>

        {isAuthenticated ? (
          <NavbarText className="navbar-link">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </NavbarText>
        ) : (
          <>
            <NavbarText className="navbar-link">
              <Link tag={Link} to="/register">
                Register
              </Link>
            </NavbarText>
            <NavbarText className="navbar-link">
              <Link tag={Link} to="/login">
                Login
              </Link>
            </NavbarText>
          </>
        )}
      </Collapse>
    </Navbar>
  );
};

export default NavigationBar;
