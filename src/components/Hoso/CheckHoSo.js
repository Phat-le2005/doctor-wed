import "./CheckHoSo.scss"
import Footer from "../../assets/image/Footer.png"
import iconArrow from '../../assets/icon/Polygon2.png';
import { useDoctor } from '../Appoinment/doctorContext'
import { FaUser,FaPhoneAlt,FaEdit } from "react-icons/fa";
import { LuCake } from "react-icons/lu";
import { GiPositionMarker } from "react-icons/gi";
import { PiGenderIntersex } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { SiUnitednations } from "react-icons/si";
import { IoTrashBin } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { createAppointment } from "../../service/appointmentService";
import { useNavigate } from "react-router-dom";
const CheckHoSo =()=>{
    const userLogin = useSelector((state) => state.userLogin.userLogin);
    const { day,dataHoSo,scheduleId} = useDoctor();
    const navigate = useNavigate()
    const handleCreateAppointment = async(hosoId) =>{
        
        const payload = {
            userId: userLogin.id,
            scheduleId: scheduleId,
            hoSoId: hosoId,
            day: day
        }
        try {
            const response = await createAppointment(payload); // đợi kết quả từ server
            const message = response.data; // lấy ra data từ response
    
            if (message.errCode === 1) {
                toast.error("Lỗi đăng ký");
            } else {
                toast.success(message.errMessage); 
                navigate("/homepage")

            }
        } catch (error) {
            toast.error("Có lỗi xảy ra: " + error.message);
        }
    
    }
    return(
        <div className="bodycheck">
            <div className="content">
                <div className='iconBanner'>
                    <span className='TrangChu'>Trang Chu</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span style={{color:"#35B8FF"}}>Hồ sơ bệnh nhân</span>
                </div>
                <span className="title">Hồ Sơ Bệnh Nhân</span>
                <div style={{display:"flex",flexWrap:"wrap",gap:"20px"}}>
                {dataHoSo.data && dataHoSo.data.length >0 && dataHoSo.data.map((itemmm,index)=>{
                    return(
                          <div className="Cardddd">
                          <div className="CardContent">
                              <div className="item" style={{fontSize:"18px",color:"#35B8FF"}}><FaUser></FaUser> {itemmm.Name}</div>
                              <div className="item"><LuCake></LuCake><span>Ngày sinh: </span> {itemmm.DateOfBirth}</div>
                              <div className="item"><FaPhoneAlt></FaPhoneAlt><span>Số Điện thoại: </span> {itemmm.phone}</div>
                              <div className="item" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}>
                                <GiPositionMarker style={{ marginRight: "5px", marginTop: "2px" }} />
                                <span style={{ fontWeight: "500", marginRight: "5px" }}>Địa Chỉ:</span>
                                <div style={{ flex: 1, wordBreak: "break-word" }}>{itemmm.address}</div>
                                </div>
                              <div className="item"><PiGenderIntersex></PiGenderIntersex><span>Giới Tính: </span> {itemmm.Sex === true ? "Nam" :"Nữ"}</div>
                              <div className="item"><MdEmail></MdEmail><span>Email: </span> {itemmm.email}</div>
                              <div className="item"><SiUnitednations></SiUnitednations><span>Dân Tộc: </span> {itemmm.danToc}</div>
                          </div>
                          <div className="CardAction">
                              <div className="deUp">
                                  <div className="De">
                                      <IoTrashBin></IoTrashBin>
                                      <span>Xóa</span>
                                  </div>
                                  <div className="Up">
                                      <FaEdit></FaEdit>
                                      <span>Chỉnh sửa</span>
                                  </div>
                              </div>
                              <div className="add" onClick={()=>handleCreateAppointment(itemmm.HSId)}>
                                  Đăng Ký
                              </div>
                          </div>
                      </div>)
                })}
               </div>
            </div>
             <div className="Footerrr">
                            <img src={Footer}></img>
                        </div>
        </div>
    )
}
export default CheckHoSo