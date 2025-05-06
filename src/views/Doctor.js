import SideBarDoctor from '../components/DoctorPage/SideBar/SideBarDoctor';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import "./Doctor.scss"
import { Outlet,Link } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
const Doctor=(props)=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
            <div className="doctor-container">
                <div className={`doctor-sidebar `}>
                <SideBarDoctor isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
                 {/* Khi Sidebar đóng, phần nội dung Dashboard sẽ mở rộng ra */}
            <div className={`doctor-content`}>
                <div className="doctor-main">
                    <PerfectScrollbar className="scroll-container">
                    <Outlet  />
                    </PerfectScrollbar>
                </div>
            </div>
            </div>       
    )
}
export default Doctor