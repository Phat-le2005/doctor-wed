import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Admin/SideBar.css"
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";
const SideBar = ({ isSidebarOpen, setIsSidebarOpen,isDarkMode,setIsDarkMode }) => {
  const navigate = useNavigate();


  // Xử lý toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Xử lý toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  // Cập nhật class cho body khi dark mode thay đổi
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="logo.png" alt="Logo" />
            </span>
            <div className="text logo-text">
              <span className="profession">Web developer</span>
            </div>
          </div>
          <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links" >
              <li className="nav-link">
                  <Link to="/Admin/DashBoard">
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">Dashboard</span>
                  </Link>
              </li>
              <li className="nav-link">
                <Link to="/Admin/User">
                  <i class='bx bx bx-user icon'></i>
                  <span className="text nav-text">User</span>
                  </Link>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">User</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-heart icon"></i>
                  <span className="text nav-text">Likes</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Wallets</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
            <li className="mode" onClick={toggleDarkMode}>
              <div className="sun-moon">
                <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"} icon`}></i>
              </div>
              <span className="mode-text text">{isDarkMode ? "Light mode" : "Dark mode"}</span>
              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

    </>
  );
};

export default SideBar;

