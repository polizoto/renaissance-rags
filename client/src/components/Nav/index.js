import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  function showNavigation() {
    const color = {
      "white": "#ffffff"
    }
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/home">
              Costumes
            </Link>
          </li>
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/contact">Contact</Link>
          </li>
          <li className="mx-1 navLink">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a style={{ color: color.white }}href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row navLink">
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/home">
              Costumes
            </Link>
          </li>
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/contact">
              Contact
            </Link>
          </li>
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/signup">Signup</Link>
          </li>
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 title">
      <h1>
        <Link to="/">
          <span role="img" aria-label="crown emoticon">
            👑 
          </span>
          Renaissance Rags
        </Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
