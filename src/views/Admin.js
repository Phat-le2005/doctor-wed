import Sidebar from "../components/Admin/SideBar";
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet,Link } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
const Admin=(props)=>{
    return (
            <div className="admin-container">
                <div className="admin-sidebar">
                    <Sidebar />
                </div>
                <div className="admin-content">
                    
                   
                    <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet/>
                        </PerfectScrollbar>
                    </div>
                    
                </div>
               
            </div>       
    )
}
export default Admin