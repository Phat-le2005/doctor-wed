import "./TQPage.scss"
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctorPaginate } from "../../../redux/action/doctorAction"
import {getAllUserPaginate} from "../../../redux/action/userAction"
import { getAllRoom } from "../../../service/roomService";
const TQPage = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const [doctors ,setDoctors ] = useState([])
    const [user,setUsers] = useState([])
    const [room,setRoom] = useState([])
    const [CountRoom,setCountRoom] = useState(null)
    const [CountUser,setCountUser] = useState(null)
    const [CountDoctor,setCountDoctor] = useState(null)
    const dispatch = useDispatch()
    const stats = [
        { label: '👤  Người dùng', value: CountUser },
        { label: '🩺 Bác sĩ', value: CountDoctor},
        { label: '🏥 Phòng khám', value:CountRoom },
        // { label: '📅 Lịch khám hôm nay', value: 311 },
      ];
      const navigate = useNavigate()
      const handleNavigateAndReload= (path) => {
       navigate(path); // Chuyển hướng
       window.location.reload(); // Làm mới trang sau khi chuyển hướng
     };
        useEffect(()=>{
              FetchListDoctorPaginate()
              FetchListUserPaginate()
              FetchListRoomPaginate()
          },[])
      const FetchListDoctorPaginate = async() =>{
        let res = await dispatch(getAllDoctorPaginate(1,5));
        if(res.errCode === 0 ){
            console.log(res.data)
            setDoctors(res.data)
            setCountDoctor(res.totalItems)
        }
    }
    const FetchListUserPaginate = async()=>{
        let res = await dispatch(getAllUserPaginate(1,5))
        if(res.errCode === 0 ){
            console.log(res.data)
            setUsers(res.data)
            setCountUser(res.totalUsers)
        }
    }
    const FetchListRoomPaginate = async()=>{
        let res = await getAllRoom(1,12)
        if(res.data.errCode === 0 ){
            console.log(res.data)
            setRoom(res.data.data)
            setCountRoom(res.data.totalItems)
        }
    }
     
    return(
        <div className="BodyTQ">
              <div className="headerPage" >
                            <div className="group">
                                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                                <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input"/>
                            </div>
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                            <div style={{width:"40px",height:"40px",borderRadius:"50%",cursor:"pointer"}}>
                                <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={doctorInfo?.doctor.doctorImage}/>
                             </div>
                        </div>
                    </div>
                    <div className="dashboard">
                        <div style={{fontSize:"20px",fontWeight:"600",marginBottom:"20px"}}>    <span >Trang Tong Quat</span></div>
  

      <div className="stats">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="Content" style={{display:"flex",gap: "10px",flexDirection:"row"}}>
      <div className="left">
      <div className="tables">
        {/* Manage Doctors */}
        <div className="table-section">
          <div className="table-header">
            <h3>Manage Doctors</h3>
            <button onClick={()=>handleNavigateAndReload('/admin/doctorpage')}>Show all</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ & tên</th>
                <th>Chức vụ</th>
                <th>Khoa</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id}>
                  <td>{d.doctorId}</td>
                  <td>{d.doctorName}</td>
                  <td>{d.position}</td>
                  <td>{d.Department.departmentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        <div className="tables">
        {/* Manage Doctors */}
        <div className="table-section">
          <div className="table-header">
            <h3>Manage Users</h3>
            <button onClick={()=>handleNavigateAndReload('/admin/user')}>Show all</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>UserName </th>
                <th>Email</th>
                <th>Phương thức đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {user.map((d) => (
                <tr key={d.id}>
                  <td>{d.userId}</td>
                  <td>{d.userName}</td>
                  <td>{d.email}</td>
                  <td style={{paddingLeft:"60px"}}>{d.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <div className="right">
                 <div className="tables">
        {/* Manage Doctors */}
        <div className="table-section">
          <div className="table-header">
            <h3>Manage Room</h3>
            <button onClick={()=>handleNavigateAndReload('/admin/roompage')}>Show all</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Số Phòng </th>
                <th>Tòa</th>
                <th>Lầu</th>
                <th>Khoa</th>
              </tr>
            </thead>
            <tbody>
              {room.map((d) => (
                <tr key={d.roomId}>
                  <td>{d.roomId}</td>
                  <td>{d.roomNumber}</td>
                  <td>{d.toa}</td>
                  <td style={{paddingLeft:"60px"}}>{d.floor}</td>
                  <td >{d.roomDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      
    </div>
    </div>

    </div>
        </div>
    )
}
export default TQPage