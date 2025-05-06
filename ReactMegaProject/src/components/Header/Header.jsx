import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../Logo";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
const Header = () => {
  const authStatus = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/Login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/Signup",
      active: !authStatus,
    },
    {
      name: "Add posts",
      slug: "/add-posts",
      active: authStatus,
    },
    {
      name: "All posts",
      slug: "/all-posts",
      active: authStatus,
    },
  ];
  return (
    <header>
      <nav>
        <div>
          <Logo />
        </div>
        <ul>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button type="button" onClick={() => navigate(item.slug)}>
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {
            authStatus && (
              <li><LogoutBtn /></li>
            )
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
