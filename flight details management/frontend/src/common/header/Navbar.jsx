import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false);
  const customer = useSelector((state) => state.customer.currentCustomer);
  return (
    <>
      <header hidden className="header">
        <div className="container j_flex">
          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link r_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/user-Account">User Account</Link>
              </li>
              <li>
                <Link to="/myOrder">My Orders</Link>
              </li>
              <li>
                <Link to="/contact">Second Hand Items</Link>
              </li>
              <li>
                <Link to="/supplier">sup</Link>
              </li>
              {customer ? (
                <>
                  <li>
                    <Link to="">LogOut</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/customerSignIn">Sign In</Link>
                  </li>
                  <li>
                    <Link to="/cusLogin">Log In</Link>
                  </li>
                </>
              )}
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
