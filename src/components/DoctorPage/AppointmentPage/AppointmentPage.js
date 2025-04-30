import "./AppointmentPage.scss"
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { useState,useRef, useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { getAllAppointment } from "../../../redux/action/appointmentAction";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { PiGenderIntersex } from "react-icons/pi";
import { BsCake2 } from "react-icons/bs";
import { Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import { AcceptAppointment } from "../../../service/appointmentService";
const AppointmentPage = () =>{
    const { doctorInfo } = useSelector((state) => state.doctorInfo);
    const [status, setStatus] = useState('booked');
    const { listAppointment, isError } = useSelector((state) => state.appointmentData);
    const [isViewingInfo, setIsViewingInfo] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      if (doctorInfo && doctorInfo.user && doctorInfo.user.doctorId) {
        dispatch(getAllAppointment(doctorInfo.user.doctorId, 1, 10, status));
      }
    }, [doctorInfo, dispatch, showAcceptModal, status]);
    const AcceptModal = ({ onClose, appointmentId }) => {
      const [selectedStatus, setSelectedStatus] = useState(""); 
      const modalRef = useRef();
    
      const handleOverlayClick = (e) => {
        if (e.target === modalRef.current) {
          onClose();
        }
      };
    
      const handleSubmit = async () => {
        if (!selectedStatus) {
          toast.error("Bạn chưa chọn trạng thái");
          return;
        }
      
        try {
          await AcceptAppointment(appointmentId, selectedStatus);
          toast.success("Cập nhật trạng thái thành công");
          onClose();
        } catch (error) {
          toast.error(error.response?.data?.message || error.message || "Cập nhật thất bại");
        }
      };
    
      return (
        <div className="modal-overlay" ref={modalRef} onClick={handleOverlayClick}>
          <div className="modal-content slide-down">
            <span>Cập nhật trạng thái</span>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <div className="CheckBox" onClick={() => setSelectedStatus("completed")}>
                <Checkbox checked={selectedStatus === "completed"} />
                <span>Xác nhận</span>
              </div>
              <div className="CheckBox" onClick={() => setSelectedStatus("cancelled")}>
                <Checkbox checked={selectedStatus === "cancelled"} />
                <span>Hủy lịch hẹn</span>
              </div>
            </div>
    
            <div className="Action">
              <button className="change-button" onClick={handleSubmit}>
                Thay đổi
              </button>
            </div>
          </div>
        </div>
      );
    };
       const InforModal = ({ onClose,data }) => {
        const modalRef = useRef();
           const handleOverlayClick = (e) => {
             // Nếu click vào phần nền (overlay) ngoài modal thì đóng
             if (e.target === modalRef.current) {
               onClose();
             }
           };
         return (
          <div className="modal-overlay"  ref={modalRef}
          onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="item">
              <RiCalendarScheduleLine></RiCalendarScheduleLine>
              <span>STT:</span>
              <div className="text">{data.Stt}</div>
            </div>
            <div className="item">
              <RiCalendarScheduleLine></RiCalendarScheduleLine>
              <span>Mã Đặt Lịch:</span>
              <div className="text">{data.appointmentId}</div>
            </div>
            <div className="item">
              <FaUser></FaUser>
              <span>Họ & Tên:</span>
              <div className="text">{data.HoSo.Name}</div>
            </div>
            <div className="item">
              <BsCake2></BsCake2>
              <span>Ngày Sinh:</span>
              <div className="text">{data.HoSo.DateOfBirth}</div>
            </div>
            <div className="item">
              <FaPhone></FaPhone>
              <span>Số Điện Thoại:</span>
              <div className="text">{data.HoSo.phone}</div>
            </div>
            <div className="item">
              <PiGenderIntersex></PiGenderIntersex>
              <span>Giới Tính:</span>
              <div className="text">{data.HoSo.sex==true ?"Nam":"Nữ"}</div>
            </div>
            <div className="item">
              <MdOutlineEmail></MdOutlineEmail>
              <span>Email:</span>
              <div className="text">{data.HoSo.email}</div>
            </div>
            <hr></hr>
            <div className="Infor2">
                <div className="InforLeft">
                    <div className="item">
                        <span>Ngày Khám: </span>
                        <div className="text">{data.day}</div>
                    </div>
                    <div className="item">
                        <span>Giờ Khám: </span>
                        <div className="text">{data.Schedule.startTime+" - "+data.Schedule.endTime}</div>
                    </div>
                    <div className="item">
                        <span>Bệnh Lý: </span>
                        <div className="text">{data.Schedule.specialty.specialtyName}</div>
                    </div>
                    <div className="item">
                        <span>Khoa: </span>
                        <div className="text">{data.Schedule.specialty.Department.departmentName}</div>
                    </div>
                    <div className="item">
                        <span>Trạng Thái: </span>
                        <div>{renderStatusDot(data.status)}</div>
                    </div>
                </div>
                <div className="InfoRight" style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
                  <span>Phòng Khám</span>
                  <div className="text" style={{marginLeft:"80px"}}>{data.Schedule.Room.toa +"."+ data.Schedule.Room.floor}{data.Schedule.Room.roomNumber.length == 2 ? data.Schedule.Room.roomNumber: "0"+data.Schedule.Room.roomNumber}</div>
                </div>
            </div>
            
          </div>
        </div>
         );
       };
      const renderStatusDot = (status) => {
        let color = 'gray';
        if (status === 'completed') color = '#09FF00';
        else if (status === 'cancelled') color = '#FFD700';
    
        return <span className="status-dot" style={{ backgroundColor: color,width:"25px",height:"25px",border:"1px solid" }}></span>;
      };
    
    return(
        <div className="BodyAppointment">
            <div className="headerPage" >
                <div style={{fontSize:"30px"}}><HiOutlineBars3></HiOutlineBars3></div>
                    <div className="group">
                        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                        <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input"/>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                        <div  style={{fontSize:"30px",color:"#35B8FF",cursor:"pointer"}}>
                        <FaRegBell></FaRegBell>
                    </div>    
                    <div style={{width:"40px",height:"40px",borderRadius:"50%",cursor:"pointer"}}>
                        <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={doctorInfo.user.doctorImage}/>
                    </div>
                </div>
            </div>
            <div className="Action">
                <input type="date"></input>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
            </div>
            <div className="table-container">
      <table className="appointment-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Id lịch khám</th>
            <th>Họ & tên</th>
            <th>Ngày khám</th>
            <th>Khung giờ</th>
            <th>Phòng khám</th>
            <th>Khám bệnh</th>
            <th>Trạng thái</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listAppointment.map((item, index) => (
            <tr key={item.id}>
              <td>{item.Stt}</td>
              <td>{item.appointmentId}</td>
              <td>{item.HoSo.Name}</td>
              <td>{item.day}</td>
              <td>{item.Schedule.startTime+" - "+ item.Schedule.endTime}</td>
              <td>{item.Schedule.Room.toa +"."+ item.Schedule.Room.floor}{item.Schedule.Room.roomNumber.length == 2 ? item.Schedule.Room.roomNumber: "0"+item.Schedule.Room.roomNumber}</td>
              <td>{item.Schedule.specialty.specialtyName}</td>
              <td>
              {renderStatusDot(item.status)}
              </td>
              <td>
              <button className="action-btn" onClick={() => {
                setSelectedAppointment(item);
                setShowAcceptModal(true);
              }}>✏️</button>

              <button className="action-btn" onClick={() => {
                setSelectedAppointment(item);
                setIsViewingInfo(true);
              }}>👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>{"<"}</button>
        <span>1</span>
        <button>{">"}</button>
      </div>
    </div>
    {showAcceptModal && selectedAppointment && (
  <AcceptModal
    onClose={() => {
      setShowAcceptModal(false);
      setSelectedAppointment(null);
    }}
    appointmentId={selectedAppointment.appointmentId}
  />
)}

{isViewingInfo && selectedAppointment && (
  <InforModal
    data={selectedAppointment}
    onClose={() => {
      setIsViewingInfo(false);
      setSelectedAppointment(null);
    }}
  />
)}
        </div>
        
    )
}
export default AppointmentPage