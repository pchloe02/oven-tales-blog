import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavbarContainer,
  NavItems,
  ButtonsSection,
  LeftSideNav,
} from "./styled";
import { Button, Dropdown } from "../../components/index.js";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../Logo";
import ProfileIcon from "../Icons/ProfileIcon.jsx";
import SearchIcon from "../Icons/SearchIcon.jsx";

const Navbar = () => {
  const { token, user, logout } = useAuth();

  const navItems = [
    { label: "Accueil", path: "/" || "/home" },
    { label: "Recettes", path: "/recipes" },
    { label: "Publier", path: "/publish" },
  ];

  const visibleNavItems = navItems.filter((item) => {
    if (item.path === "/publish" && !token) return false;
    return true;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <NavbarContainer>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <LeftSideNav>
        <NavItems>
          {visibleNavItems.map((item) => (
            <Link key={item.path} to={item.path} className="nav-link">
              {item.label}
            </Link>
          ))}
        </NavItems>
        <ButtonsSection>
          <SearchIcon />
          {!token ? (
            <>
              <Link key="/login" to="/login">
                <Button>Login</Button>
              </Link>
              <Link key="/register" to="/register">
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <>
              <Dropdown
                label={<ProfileIcon />}
                items={[
                  { label: "Profile", to: "/profile" },
                  { label: "Logout", action: handleLogout },
                ]}
              />
              {/* <Button   onClick={handleLogout}>Logout</Button> */}
            </>
          )}
        </ButtonsSection>
      </LeftSideNav>
    </NavbarContainer>
  );
};

export default Navbar;
