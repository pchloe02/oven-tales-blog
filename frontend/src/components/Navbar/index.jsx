import React from "react";
import { Link } from "react-router-dom";
import { NavbarContainer, NavItems } from "./styled";
import Logo from "../Logo";

const Navbar = () => {
  const navItems = [
    { label: "Home", path: "/" || "/home" },
    { label: "About", path: "/about" },
    { label: "Recipes", path: "/recipes" },
  ];

  return (
    <NavbarContainer>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <NavItems>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="nav-link">
            {item.label}
          </Link>
        ))}
      </NavItems>
      <Link key="/login" to="/login">
        <button>Login</button>
      </Link>
      <Link key="/register" to="/register">
        <button>Register</button>
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
