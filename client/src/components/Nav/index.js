import React from "react";
import Auth from "../../utils/auth";
import { UPDATE_CURRENT_CATEGORY} from '../../utils/actions';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

function Nav() {
  const dispatch = useDispatch();
  function showNavigation() {

    const color = {
      "white": "#816362",
      "hover": "#fbec5d"
    }
    const handleClick = () => {
      dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: null,
      });
      // console.log(state)
    };
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1 navLink">
            <Link style={{ color: color.white }} onClick={() => {
            handleClick();
          }} to="/home">
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
        <ul className="flex-row">
          <li className="mx-1 navLink">
            <Link style={{ color: color.white, hover: color.hover }} onClick={() => {
            handleClick();
          }} to="/home">
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

  const color = {
    "white": "#816362"
  }
  return (
    <header className="flex-row px-1 title">
      <h1>
        <Link style={{ color: color.white, textDecoration: "none" }} to="/">
          <span role="img" aria-label="crown emoticon">
            👑 
          </span>
          <span className="title">
          Renaissance Rags
          </span>
        </Link>
      </h1>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
