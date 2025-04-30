import "./SideBarDoctor.scss"
import { FaFileAlt,FaCalendarAlt,FaHistory,FaHome  } from "react-icons/fa";
import { useSelector } from "react-redux";
import { PiHospitalBold } from "react-icons/pi";
import { RiLogoutBoxLine } from "react-icons/ri";
const SideBarDoctor = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    console.log(doctorInfo)
    return(
        <>
        <div className="bodySideBar">
            <div style={{display:"flex",alignItems:"center",flexDirection:"column",marginTop:"20px"}}>
           <div className="imgSide">
                <img src={doctorInfo.user.doctorImage}></img>
           </div>
           <div className="name">
                <span>{doctorInfo.user.position+" "+ doctorInfo.user.doctorName}</span>
           </div>
           </div>
           <div>
           <div className="item">
                <FaFileAlt></FaFileAlt>
                <span>Hồ Sơ Bác Sĩ</span>
           </div>
           <div className="item">
                <FaCalendarAlt></FaCalendarAlt>
                <span>Quản Lý Ngày Khám</span>
           </div>
           <div className="item">
                <FaCalendarAlt></FaCalendarAlt>
                <span>Xác Nhận Lịch Hẹn</span>
           </div>
           <div className="item">
                <PiHospitalBold></PiHospitalBold>
                <span>Khám Bệnh</span>
           </div>
           <div className="item">
                <FaHistory></FaHistory>
                <span>Lịch Sử Khám</span>
           </div>
           </div>
           <div className="item-foot">
                <div className="itemm">
                    <FaHome></FaHome>
                    <span>
                        Về Trang Chủ
                    </span>
                </div>
                <div className="itemm">
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