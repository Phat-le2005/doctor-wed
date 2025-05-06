import "./SideBarDoctor.scss"
import { FaFileAlt,FaCalendarAlt,FaHistory,FaHome  } from "react-icons/fa";
import { useSelector } from "react-redux";
import { PiHospitalBold } from "react-icons/pi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutDoctor } from "../../../redux/action/doctorAction";
import {  useNavigate } from 'react-router-dom';
const SideBarDoctor = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const navigate = useNavigate()
    console.log(doctorInfo)
    const dispatch = useDispatch()
    const handleNavigateAndReload= (path) => {
     navigate(path); // Chuyển hướng
     window.location.reload(); 
   };
     const handleLogout = async () => {
       await dispatch(logoutDoctor());
       toast.success("Đăng xuất thành công");
       navigate("/logindoctor");
     };
    return(
        <>
        <div className="bodySideBar">
            <div style={{display:"flex",alignItems:"center",flexDirection:"column",marginTop:"20px"}}>
           <div className="imgSide">
                <img src={doctorInfo?.doctor.doctorImage}></img>
           </div>
           <div className="name">
                <span>{doctorInfo?.doctor.position+" "+ doctorInfo?.doctor.doctorName}</span>
           </div>
           </div>
           <div>
           <div className="item" onClick={()=>handleNavigateAndReload('/doctorpage/inforpage')}>
                <FaFileAlt></FaFileAlt>
                <span>Hồ Sơ Bác Sĩ</span>
           </div>
           <div className="item" onClick={()=>handleNavigateAndReload('/doctorpage/schedulepage')}>
                <FaCalendarAlt></FaCalendarAlt>
                <span>Quản Lý Ngày Khám</span>
           </div>
           <div className="item" onClick={()=>handleNavigateAndReload('/doctorpage/appointmentpage')}>
                <FaCalendarAlt></FaCalendarAlt>
                <span>Xác Nhận Lịch Hẹn</span>
           </div>
           <div className="item" onClick={()=>handleNavigateAndReload('/doctorpage/historypage')}>
                <PiHospitalBold></PiHospitalBold>
                <span>Khám Bệnh</span>
           </div>
           {doctorInfo?.doctor && doctorInfo?.doctor.role != 0  &&  <div className="item" onClick={()=>handleNavigateAndReload('/doctorpage/specialtypage')}>
                <FaHistory></FaHistory>
                <span>Chuyên Khoa</span>
           </div>}
           {doctorInfo?.doctor?.role==2 && doctorInfo?.doctor &&  <div className="item" onClick={()=>handleNavigateAndReload('/admin/tongquat')}>
                <FaHistory></FaHistory>
                <span>Admin</span></div>}
             
           </div>
           <div className="item-foot" onClick={()=>navigate('/homepage')}>
                <div className="itemm">
                    <FaHome></FaHome>
                    <span>
                        Về Trang Chủ
                    </span>
                </div>
                <div className="itemm" onClick={()=>handleLogout()}>
                    <RiLogoutBoxLine></RiLogoutBoxLine>
                    <span>
                        Đăng Xuất
                    </span>
                </div>
           </div>
        </div>
        </>
    )
}
export default SideBarDoctor