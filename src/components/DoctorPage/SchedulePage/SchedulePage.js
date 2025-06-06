import "./Schedule.scss"
import { useSelector } from "react-redux";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { getAllSchedule } from "../../../service/scheduleService";
const SchedulePage = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [startDate, setStartDate] = useState(getStartOfWeek(new Date()));
    const [scheduleData,setScheduleData] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        await ferchDataSchedule();  // Lấy dữ liệu
        
      };
      
      fetchData();
    }, [doctorInfo.doctor.doctorId]);
 const ferchDataSchedule = async () => {
  const data = await getAllSchedule(doctorInfo.doctor.doctorId);
  console.log(data)
  const transformed = transformScheduleData(data);
  setScheduleData(transformed)
 
};
console.log(scheduleData)
  const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  const hours = Array.from({ length: 14 }, (_, i) => 7 + i); // 7h - 20h
  const transformScheduleData = (rawData) => {
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    const result = [];
  
    rawData.forEach((item) => {
      const workDays = item.workDay.split(",").map(Number); // ["2","5","6"] => [2,5,6]
  
      workDays.forEach((day) => {
        const dayName = daysOfWeek[day - 2]; // Vì "Thứ 2" là index 0
        const hour = item.startTime.slice(0, 5); // "07:00:00" => "07:00"
  
        if (!result[dayName]) result[dayName] = {};
        result[dayName][hour] = item;
      });
    });
  
    return result;
  };
  const CreateModal = ({ onClose }) => {
    const modalRef = useRef();
    const handleOverlayClick = (e) => {
      // Nếu click vào phần nền (overlay) ngoài modal thì đóng
      if (e.target === modalRef.current) {
        onClose();
      }
    };
    return (
      <div className="modal-overlay" ref={modalRef}
      onClick={handleOverlayClick}>
        <div className="modal-content slide-down" >
          <span>Tạo Ngày Khám</span>
          <hr></hr>
          <input type="date" ></input>
          <div style={{display:"flex",gap:"20px"}}>
            <input type="time"></input>
            <input type="time"></input>
          </div>
          <div style={{display:"flex",justifyContent:"start"}}>
            <span>
                Phòng Khám
            </span>
          </div>
          <select style={{width:"40%",height:"40px",padding:"10px",borderRadius:"20px"}}>
            <option >1</option>
          </select>
          <div className="Action">
            <button className="change-button">Thêm </button>
          </div>
         
        </div>
      </div>
    );
  };
  const UpdateModal = ({ onClose }) => {
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
      <div className="modal-content slide-down">
        <div className="modal-header">
          <h2>Thay đổi</h2>
        </div>

        <div className="modal-body">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Thứ</th>
                <th>Giờ</th>
                <th>Phòng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { Object.entries(scheduleData).map(([day, slots]) => {
  return Object.entries(slots).map(([time, item]) => (
    <tr key={day + time}>
      <td>{day}</td>
      <td>{time}</td>
      <td>{item.Room.toa}{item.Room.floor}{item.Room.roomNumber <10 ? "0"+item.Room.roomNumber : item.Room.roomNumber}</td>
      <td>
        <button className="edit-btn">✏️</button>
      </td>
    </tr>
  ));
})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  };
  const DeleteModal = ({ onClose }) => {
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
      <div className="modal-content slide-down">
        <div className="modal-header">
          <h2>Xóa Lịch Khám</h2 >
        </div>

        <div className="modal-body">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Thứ</th>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Phòng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            { Object.entries(scheduleData).map(([day, slots]) => {
  return Object.entries(slots).map(([time, item]) => (
    <tr key={day + time}>
      <td>{day}</td>
      <td>{time}</td>
      <td>{item.Room.toa}{item.Room.floor}{item.Room.roomNumber <10 ? "0"+item.Room.roomNumber : item.Room.roomNumber}</td>
      <td>
      <button className="edit-btn"><ImBin/></button>
      </td>
    </tr>
  ));
})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  };
    
 return(
    <div className="BodySchedule">
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
                    <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={doctorInfo.doctor.doctorImage}/>
                 </div>
            </div>
        </div>
        <div className="weekly-schedule">
      {/* Thanh chọn ngày */}
      <div className="header">
        <select className="date-range">
          <option>Từ ngày {formatDate(startDate)} đến ngày {formatDate(getEndDate(startDate))}</option>
        </select>
        <div className="buttons">
          <button className="btn edit" onClick={() => setShowUpdateModal(true)}>Chỉnh sửa</button>
          <button className="btn delete" onClick={()=>setShowDeleteModal(true)}>Xóa</button>
          <button className="btn create" onClick={() => setShowCreateModal(true)}>Tạo</button>
        </div>
      </div>

      {/* Bảng lịch */}
      <div className="table-wrapper">
      <table className="schedule-table">
  <thead>
    <tr>
      <th>Giờ</th>
      {daysOfWeek.map((day, index) => (
        <th key={index}>{day}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {hours.map((hour) => {
      const hourStr = `${hour.toString().padStart(2, "0")}:00`;
      return (
        <tr key={hour}>
          <td>{hourStr}</td>
          {daysOfWeek.map((day) => (
            <td key={day}>
              {
                scheduleData?.[day]?.[hourStr]
                  ? (
                    <div className="schedule-cell">
                      <div>Phòng: {scheduleData[day][hourStr].Room.toa}{scheduleData[day][hourStr].Room.floor}{scheduleData[day][hourStr].Room.roomNumber < 10 ? "0"+scheduleData[day][hourStr].Room.roomNumber : scheduleData[day][hourStr].Room.roomNumber}</div>
                    </div>
                  )
                  : ""
              }
            </td>
          ))}
        </tr>
      );
    })}
  </tbody>
</table>
      </div>
    </div>
    {showCreateModal && (
                <CreateModal onClose={() => setShowCreateModal(false)} />
            )}
     {showUpdateModal && (
                <UpdateModal onClose={() => setShowUpdateModal(false)} />
            )}
    {showDeleteModal && (
                <DeleteModal onClose={() => setShowDeleteModal(false)} />
            )}

    </div>
 )
}
const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN');
  };
  
  const getStartOfWeek = (date) => {
    const day = date.getDay() || 7;
    const monday = new Date(date);
    monday.setDate(date.getDate() - day + 1);
    return monday;
  };
  
  const getEndDate = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return endDate;
  };
export default SchedulePage