import React from "react";
import { Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </Nav>
  );
};

export default Navbar;
