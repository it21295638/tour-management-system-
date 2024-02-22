import React from 'react';
import './header.css';

import logo from '../../../../assets/images/logoBrandLarge.png';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        // <div className="top_navbar">
        //     <div className="col-12 top_menu">           
        //         <div className="col-2  d-flex justify-content-end">      
        //     <img src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1679505472/logoLarge_n8s9ct.png" />           
        //         </div>
        //         <h3 className="admin-text">Guident Computers</h3>
        //         <div className="col-8 d-flex justify-content-end">
        //             <ul className="mb-0">
        //                 <li className="mt-1">
        //                     <p className="d-inline me-2"><i className="fa fa-sign-out logoutIcon" aria-hidden="true"/>
        //                     </p>
        //                     <p className="d-inline ms-2 me-2 fw-bold profileText">User</p>
        //                 </li>
        //                 <li>
        //                     <Link to="/client">
        //                         <i className="fas fa-user"/>
        //                     </Link>
        //                 </li>
        //             </ul>
        //         </div>

        //     </div>
        // </div>

        <>

<header hidden id="main-header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1679505472/logoLarge_n8s9ct.png" />
          </a>
          <h4 className="admin-text">Guident Computers</h4>
        </div>

        <nav id="navbar">
          <ul>
           
              <li>
                <button className="header-btn" >
                  
                </button>
              </li>
           
            <li>
              <button className="header-btn-logout" >
                Logout
              </button>
            </li>

            <li>
              <a href="/profile">
                <img className="person-logo" src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1679511620/icons8-administrator-male-100_1_gd6jld.png" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

        
        </>
    );
}

export default Header;