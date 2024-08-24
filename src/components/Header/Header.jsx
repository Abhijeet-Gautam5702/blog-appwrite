import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../index.js";
import { useNavigate } from "react-router-dom";

function Header() {
  // get the auth-status (whether user is logged-in or not) from the redux store
  const authStatus = useSelector((state) => state.status);

  // useNavigate() hook to programmatically navigate to a specific route or path
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <nav className="flex">
        {/* Logo */}
        <div className="mr-4">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>
        <ul className="flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {/* Logout Button (shown only if user is logged-in) */}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
