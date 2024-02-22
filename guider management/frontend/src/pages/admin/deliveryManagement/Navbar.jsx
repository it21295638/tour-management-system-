// import axios from "axios";
// import React from "react";
// import "./styles/nav.css";

// const Navbar = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const logout = () => {
//     localStorage.removeItem("user");
//     window.location.href = "/";
//     axios.post("/user/logout");
//   };
//   return (
//     <div>
//       <div className="containder">
//         <div className="head">
//           <div className="logo">
//             <a href="/AdminDashboard">
//               <img src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1679505472/logoLarge_n8s9ct.png" />
//             </a>
//           </div>
//           <h1>Guident Computers</h1>
//           <row></row>
//           {user.systemAdmin ? <h2>Administrator Panel</h2> : <h2>Employee </h2>}
//           <div className="logout">
//             <button className="btn" onClick={logout}>
//               Logout
//             </button>
//           </div>

//           <div className="admin_logo">
//             <img src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1679511620/icons8-administrator-male-100_1_gd6jld.png" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/header.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/adminAndEmployee");
  };

  const markAttendance = () => {
    const confirm = window.confirm("Are you sure you want to mark attendance?");
    if (confirm) {
      axios
        .post("/api/attendance", {
          userID: user._id,
        })
        .then((res) => {
          console.log("res>>> ", res);
        })
        .catch((err) => {
          console.log("err>>> ", err);
        });
    }
  };

  return (
    <header id="main-header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1679505472/logoLarge_n8s9ct.png" />
          </a>
          <h1 className="admin-text">Guident Computers</h1>
        </div>

        <nav id="navbar">
          <ul>
            {!user.systemAdmin ? (
              <li>
                <button className="header-btn" onClick={markAttendance}>
                  Mark Attendance
                </button>
              </li>
            ) : null}
            <li>
              <button className="header-btn-logout" onClick={logout}>
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
  );
}
