import Sidebar from "../components/Admin/SideBar";
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet,Link } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
const Admin=(props)=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
            <div className="admin-container">
                <div className={`admin-sidebar`}>
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
                 {/* Khi Sidebar đóng, phần nội dung Dashboard sẽ mở rộng ra */}
            <div className={`admin-content`}>
                <div className="admin-main">
                    <PerfectScrollbar>
                    <Outlet context={{ isDarkMode, setIsDarkMode }} />
                    </PerfectScrollbar>
                </div>
            </div>
               
            </div>       
    )
}
export default Admin