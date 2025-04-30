import "./PhieuKhamBenh.scss"
import iconArrow from '../../assets/icon/Polygon2.png';
import { FaUserPlus } from "react-icons/fa";
import { get_Hoso } from '../../service/hoSoService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Footer from "../../assets/image/Footer.png"
import { CgDanger } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import {getPKB } from '../../service/PhieuKBService'
import { useState,useEffect } from "react";
const PhieuKhamBenh = () =>{
    const userLogin = useSelector((state) => state.userLogin.userLogin);
    const[dataHoSo,setDataHoSo] = useState([])
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [detailPKB, setDetailPKB] = useState(null);
    const ferchDataHoso = async()=>{
      const data =await getPKB(userLogin.id)
      console.log(data)
      if(data.errCode ===1){
        toast.error("Vui long dang Ky")
      }
      setDataHoSo(data.data)
    }
    const modelChitiet = (data) =>{
        setDetailPKB(data);
        setShowModal(true);
    }
useEffect(()=>{ferchDataHoso()},[])
    return(
        <div className="PKH">
            <div className="Content">
                 <div className='iconBanner'>
                                    <span className='TrangChu'>Trang Chu</span>
                                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                                    <span style={{color:"#35B8FF"}}>Hồ sơ bệnh nhân</span>
                </div>
                <div className="Content-container">
                    <div className="Select">
                        <div className="btn-add">
                            <div className="circle">
                            <FaUserPlus></FaUserPlus>
                            </div>
                            
                            <span>Thêm Hồ Sơ</span>
                        </div>
                        <div className="Action">
                            <div className="item" onClick={()=>navigate("/hosobenhnhan")}>
                                <span>
                                    Hồ Sơ Bệnh Nhân
                                </span>
                            </div>
                            <div className="item" style={{borderRight:"2px solid #35B8FF"}}>
                                <span>
                                    Phiếu Khám Bệnh
                                </span>
                            </div>
                            <div className="item" onClick={()=>navigate("/tracuuhs")}>
                                <span>
                                    Tra Cứu Hồ Sơ
                                </span>
                            </div>
                            <div className="item">
                                <span>
                                    Thông Báo
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="HoSoContent">
                        <div className="title">
                            <span>Danh Sách Phiếu Khám Bệnh</span>
                        </div>
                        <div className="list-Action">
                            <div className="btn">
                                Đang Chờ
                            </div>
                            <div className="btn">
                                Đã Xác Nhận 
                            </div>
                            <div className="btn">
                                Đã Hủy
                            </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px",justifyContent:"center" }}>
                            {dataHoSo && dataHoSo.length > 0 && dataHoSo.map((itemmm, index) => {
                                return (
                                <div className="Cardddd" key={index}>
                                   <div className="Card-content">
                                     <span style={{fontSize:"20px",fontWeight:"500",color:"#35B8FF"}}>Mã Đặt Lịch # {itemmm.appointmentId}</span>
                                     <span>Họ và Tên: {itemmm.HoSo.Name}</span>
                                     <span>Ngày Sinh - Giới Tính: {itemmm.HoSo.DateOfBirth} - {itemmm.HoSo.sex === true ? "Nữ": "Nam"}</span>
                                     <span>------------------------------</span>
                                     <span>{itemmm.Schedule.Doctor.position} | {itemmm.Schedule.Doctor.doctorName} </span>
                                     <div className="con-item">
                                        <span>{itemmm.Schedule.startTime}-Ngày {itemmm.day}</span>
                                        <span>
                                            Phòng Khám: {itemmm.Schedule.Room.toa+itemmm.Schedule.Room.floor+itemmm.Schedule.Room.roomNumber}
                                        </span>
                                    </div>
                                    <span>Bệnh Lý: {itemmm.Schedule.specialty.specialtyName}</span>
                                   </div>
                                   <div className="Card-Action">
                                        <div style={{display:"flex"}}>Trạng Thái: <div style={{borderRadius:"50%",   backgroundColor:
                                            itemmm.status === "booked"
                                            ? "gray"
                                            : itemmm.status === "completed"
                                            ? "green"
                                            : itemmm.status === "cancelled"
                                            ? "red"
                                            : "transparent",width:"20px",height:"20px",marginTop:"3px",marginLeft:"2px"}}></div></div>
                                        <div className="add" onClick={()=>modelChitiet(itemmm)}> <CgDanger></CgDanger> <span>Chi Tiết</span></div>
                                   </div>
                                </div>
                                );
                            })}
                            {showModal && detailPKB && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                <h2>Phiếu Khám Bệnh</h2>
                                <p><strong>Họ tên:</strong> {detailPKB.HoSo.Name}</p>
                                <p><strong>Ngày sinh:</strong> {detailPKB.HoSo.DateOfBirth}</p>
                                <p><strong>Giới tính:</strong> {detailPKB.HoSo.sex ? "Nữ" : "Nam"}</p>
                                <p><strong>Địa chỉ:</strong> {detailPKB.HoSo.address}</p>
                                <p><strong>SĐT:</strong> {detailPKB.HoSo.phone}</p>
                                <hr />
                                <p><strong>Bác sĩ:</strong> {detailPKB.Schedule.Doctor.position} | {detailPKB.Schedule.Doctor.doctorName}</p>
                                <p><strong>Bệnh lý:</strong> {detailPKB.Schedule.specialty.specialtyName}</p>
                                <p><strong>Phòng khám:</strong> {detailPKB.Schedule.Room.toa}{detailPKB.Schedule.Room.floor}{detailPKB.Schedule.Room.roomNumber}</p>
                                <p><strong>Thời gian:</strong> {detailPKB.Schedule.startTime} - Ngày {detailPKB.day}</p>

                                <button onClick={() => setShowModal(false)} className="close-btn">Đóng</button>
                                </div>
                            </div>
                            )}
                            </div>
                    </div>

                </div>
            </div>
              <div className="Footerrr">
                                        <img src={Footer}></img>
                                    </div>
        </div>
    )
}
export default PhieuKhamBenh