import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/"><img src="\assets\CodeMania-Bgxof_ui.jpg" alt="CodeMania" className="logo" /></NavLink>
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            &#9776;
          </div>
          <nav>
            <ul className={menuActive ? 'active' : ''}>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/register"> Register </NavLink>
              </li>
              <li>
                <NavLink to="/login"> Login </NavLink>
              </li>
              <li>
                <NavLink to="/profile"> ProfilePage </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Navbar;
