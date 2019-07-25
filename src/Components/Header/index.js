import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";


const Header =() => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      {isAuthenticated && <Link to="/profile">Profile</Link>}
      {!isAuthenticated && (
        <button onClick={() =>loginWithRedirect({})}>Log in</button>)}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </nav>
  );
};

export default Header;
