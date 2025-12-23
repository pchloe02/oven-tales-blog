import React from "react";
import { Link } from "react-router-dom";
import {
  NavbarContainer,
  NavItems,
  ButtonsSection,
  LeftSideNav,
} from "./styled";
import { Button } from "../../components/index.js";
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
      <LeftSideNav>
        <NavItems>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="nav-link">
              {item.label}
            </Link>
          ))}
        </NavItems>
        <ButtonsSection>
          <Link key="/login" to="/login">
            <Button>Login</Button>
          </Link>
          <Link key="/register" to="/register">
            <Button>Register</Button>
          </Link>
        </ButtonsSection>
      </LeftSideNav>
    </NavbarContainer>
  );
};

export default Navbar;
