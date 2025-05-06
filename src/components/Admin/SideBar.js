import "./SideBar.scss";
import { FaFileAlt, FaCalendarAlt, FaHistory, FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { PiHospitalBold } from "react-icons/pi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { FaHospital } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { MdMeetingRoom, MdManageAccounts } from "react-icons/md";
import { logoutDoctor } from "../../redux/action/doctorAction";
import { toast } from "react-toastify";

const SideBarDoctor = () => {
  const { doctorInfo } = useSelector((state) => state.doctorInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateAndReload = (path) => {
    navigate(path);
//     window.location.reload();
  };

  const handleLogout = async () => {
    await dispatch(logoutDoctor());
    toast.success("Đăng xuất thành công");
    navigate("/logindoctor");
  };

  return (
    <div className="bodySideBarAdmin">
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "20px" }}>
        <div className="imgSide">
          <img
            src={doctorInfo?.doctor?.doctorImage || "/default-avatar.png"}
            alt="avatar"
          />
        </div>
        <div className="name">
          <span>{doctorInfo?.doctor?.doctorName || "Bác sĩ"}</span>
        </div>
      </div>

      <div>
        <div className="item" onClick={() => handleNavigateAndReload('/admin/tongquat')}>
          <FaFileAlt />
          <span>Trang Tổng Quát</span>
        </div>
        <div className="item" onClick={() => handleNavigateAndReload('/admin/khoapage')}>
          <FaHospital />
          <span>Quản Lý Khoa</span>
        </div>
        <div className="item" onClick={() => handleNavigateAndReload('/admin/doctorpage')}>
          <FaUserDoctor />
          <span>Quản Lý Bác Sĩ</span>
        </div>
        <div className="item" onClick={() => handleNavigateAndReload('/admin/roompage')}>
          <MdMeetingRoom />
          <span>Quản Lý Phòng Khám</span>
        </div>
        <div className="item" onClick={() => handleNavigateAndReload('/admin/user')}>
          <MdManageAccounts />
          <span>Tài Khoản</span>
        </div>
        <div className="item" onClick={() => handleNavigateAndReload('/admin/thongke')}>
          <VscGraph />
          <span>Thống Kê</span>
        </div>
      </div>

      <div className="item-foot">
        <div className="itemm" onClick={() => handleNavigateAndReload("/doctorpage/inforpage")}>
          <FaHome />
          <span>Về Trang Bác Sĩ</span>
        </div>
        <div className="itemm" onClick={handleLogout}>
          <RiLogoutBoxLine />
          <span>Đăng Xuất</span>
        </div>
      </div>
    </div>
  );
};

export default SideBarDoctor;
