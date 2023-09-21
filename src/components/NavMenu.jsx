import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";

const NavMenu = (props) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    props.logout();

    navigate("/");
  };

  const guestLink = () => (
    <div>
      <ul>
        <li>
          <Link
            style={{ marginRight: "10px" }}
            className="active mb-1 nav-link"
            aria-current="page"
            to="/service"
          >
            Services
          </Link>
        </li>

        <li>
          <Link className="mb-1 nav-item nav-link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="mb-1 nav-item nav-link" to="/">
            Contact
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="mb-2 home-button"
            onClick={handleLogin}
            style={{ backgroundColor: "#0275d8" }}
          >
            Login
          </button>
        </li>
        <li>
          <button
            type="button"
            className="signup-button mb-2"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </li>
        <li>
          <Link className="mb-1 nav-item nav-link" to="/real-estate">
            Real Estate
          </Link>
        </li>
      </ul>
    </div>
  );

  const authLink = () => (
    <div>
      <ul>
        <li>
          <Link
            style={{ marginRight: "10px" }}
            className="active mb-1 nav-link"
            aria-current="page"
            to="/service"
          >
            Services
          </Link>
        </li>
        <li>
          <Link className="mb-1 nav-item nav-link" to="/real-estate">
            Real Estate
          </Link>
        </li>
        <li>
          <Link className="mb-1 nav-item nav-link" to="/account">
            Account
          </Link>
        </li>
        <li>
          <Link className="mb-1 nav-item nav-link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="mb-1 nav-item nav-link" to="/">
            Contact
          </Link>
        </li>

        <li>
          <Link
            className="mb-1 nav-item nav-link"
            to="/"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
  return <div>{props.isAuthenticated ? authLink() : guestLink()}</div>;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavMenu);
