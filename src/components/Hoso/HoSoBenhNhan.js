import "./HoSoBenhNhan.scss"
import iconArrow from '../../assets/icon/Polygon2.png';
import { FaUserPlus } from "react-icons/fa";
import { get_Hoso } from '../../service/hoSoService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaUser,FaPhoneAlt,FaEdit } from "react-icons/fa";
import { LuCake } from "react-icons/lu";
import Footer from "../../assets/image/Footer.png"
import { GiPositionMarker } from "react-icons/gi";
import { PiGenderIntersex } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { SiUnitednations } from "react-icons/si";
import { IoTrashBin } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import {DeleteHoSo } from "../../service/hoSoService"
import { UpdateHoSo } from "../../service/hoSoService";
import { useState,useEffect } from "react";
const HoSoBenhNhan = () =>{
    const userLogin = useSelector((state) => state.userLogin.userLogin);
    const[dataHoSo,setDataHoSo] = useState([])
    const navigate = useNavigate()
    const [selectedHoSo, setSelectedHoSo] = useState(null);
    const [selectedUpdate,setSelectedUpdate] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, hsId: null });
    const [updatedData, setUpdatedData] = useState({}); // Dữ liệu sửa đổi trong modal
    const handleDelete = async () => {
        try {
            const res = await DeleteHoSo(deleteConfirm.hsId);
            console.log(res)
            if (res.errCode === 0) {
                toast.success("Xóa hồ sơ thành công");
                setDeleteConfirm({ show: false, hsId: null });
                ferchDataHoso(); 
            } else {
                toast.error("Xóa thất bại: " + res.errMessage);
                ferchDataHoso()
            }
        } catch (err) {
            toast.error("Đã có lỗi xảy ra");
            console.error(err);
        }
    };


    const handleOpenModal = (hoSo) => {
      setSelectedUpdate(hoSo);
      setUpdatedData({
        ...hoSo,
      });
    };
  
    const handleCloseModal = () => {
      setSelectedUpdate(null);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async () => {
      try {
        const res = await UpdateHoSo(selectedUpdate.HSId, updatedData); // Gọi API update
        if (res.errCode === 0) {
          toast.success("Cập nhật hồ sơ thành công");
          setSelectedUpdate(null);
          ferchDataHoso(); // Tải lại dữ liệu hồ sơ sau khi cập nhật
        } else {
          toast.error("Cập nhật không thành công: " + res.errMessage);
        }
      } catch (err) {
        toast.error("Đã có lỗi xảy ra");
        console.error(err);
      }
    };
    const ferchDataHoso = async()=>{
      const data =await get_Hoso(userLogin.id)
      console.log(data)
      if(data.errCode ===1){
        toast.error("Ko nhan dc Data")
      }
      setDataHoSo(data.data)
    }
useEffect(()=>{ferchDataHoso()},[])
    return(
        <div className="HSBN">
            <div className="Content">
                 <div className='iconBanner'>
                                    <span className='TrangChu'>Trang Chu</span>
                                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                                    <span style={{color:"#35B8FF"}}>Hồ sơ bệnh nhân</span>
                </div>
                <div className="Content-container">
                    <div className="Select">
                        <div className="btn-add" onClick={()=> navigate("/appointment/create_hoso")}>
                            <div className="circle">
                            <FaUserPlus></FaUserPlus>
                            </div>
                            
                            <span>Thêm Hồ Sơ</span>
                        </div>
                        <div className="Action">
                            <div className="item" style={{borderRight:"2px solid #35B8FF"}} >
                                <span>
                                    Hồ Sơ Bệnh Nhân
                                </span>
                            </div>
                            <div className="item" onClick={()=>navigate("/phieukhambenh")}>
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
                            <span>Hồ Sơ Bệnh Nhân</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {dataHoSo.data && dataHoSo.data.length > 0 && dataHoSo.data.map((itemmm, index) => {
                                return (
                                <div className="Cardddd" key={index}>
                                    <div className="CardContent">
                                    <div className="item" style={{ fontSize: "18px", color: "#35B8FF" }}>
                                        <FaUser /> {itemmm.Name}
                                    </div>
                                    <div className="item"><LuCake /> <span>Ngày sinh:</span> {itemmm.DateOfBirth}</div>
                                    <div className="item"><FaPhoneAlt /> <span>Số Điện thoại:</span> {itemmm.phone}</div>
                                    <div className="item" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}>
                                        <GiPositionMarker style={{ marginRight: "5px", marginTop: "2px" }} />
                                        <span style={{ fontWeight: "500", marginRight: "5px" }}>Địa Chỉ:</span>
                                        <div style={{ flex: 1, wordBreak: "break-word" }}>{itemmm.address}</div>
                                    </div>
                                    <div className="item"><PiGenderIntersex /> <span>Giới Tính:</span> {itemmm.Sex ? "Nam" : "Nữ"}</div>
                                    <div className="item"><MdEmail /> <span>Email:</span> {itemmm.email}</div>
                                    <div className="item"><SiUnitednations /> <span>Dân Tộc:</span> {itemmm.danToc}</div>
                                    </div>
                                    <div className="CardAction">
                                    <div className="deUp">
                                        <div className="De"  onClick={() => setDeleteConfirm({ show: true, hsId: itemmm.HSId })}><IoTrashBin /><span>Xóa</span></div>
                                        <div className="Up"  onClick={() => handleOpenModal(itemmm)}><FaEdit /><span>Chỉnh sửa</span></div>
                                    </div>
                                    <div className="add"  onClick={() => setSelectedHoSo(itemmm)}> <CgDanger></CgDanger> <span>Chi Tiết</span></div>
                                    </div>
                                </div>
                                );
                            })}
                            {selectedHoSo && (
                            <div className="ModalOverlay" onClick={() => setSelectedHoSo(null)}>
                                <div className="ModalContent" onClick={e => e.stopPropagation()}>
                                <h3>Chi tiết hồ sơ</h3>
                                <div className="info"><span>Họ và tên:</span> <strong>{selectedHoSo.Name}</strong></div>
                                <div className="info"><span>Ngày sinh:</span> {selectedHoSo.DateOfBirth}</div>
                                <div className="info"><span>Số điện thoại:</span> {selectedHoSo.phone}</div>
                                <div className="info"><span>Giới tính:</span> {selectedHoSo.Sex ? "Nam" : "Nữ"}</div>
                                <div className="info"><span>CMND:</span> {selectedHoSo.CMND}</div>
                                <div className="info"><span>Email:</span> {selectedHoSo.email}</div>
                                <div className="info"><span>Nghề nghiệp:</span> {selectedHoSo.Job}</div>
                                <div className="info"><span>Địa chỉ:</span> {selectedHoSo.address}</div>
                                <div className="info"><span>Dân tộc:</span> {selectedHoSo.danToc}</div>
                                <button className="closeBtn" onClick={() => setSelectedHoSo(null)}>Đóng</button>
                                </div>
                            </div>
                            )} {/** Delete*/}
                            {deleteConfirm.show && (
                                <div className="ModalOverlay" onClick={() => setDeleteConfirm({ show: false, hsId: null })}>
                                    <div className="ModalContent" onClick={e => e.stopPropagation()}>
                                    <h3>Xác nhận xoá hồ sơ</h3>
                                    <p>Bạn có chắc chắn muốn xoá hồ sơ này không?</p>
                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                        <button style={{width:"80px",height:"40px",borderRadius:"10px"}} onClick={() => setDeleteConfirm({ show: false, hsId: null })}>Hủy</button>
                                        <button onClick={()=>handleDelete()} style={{ backgroundColor: "#FF4D4F", color: "white" ,width:"80px",height:"40px",borderRadius:"10px"}}>Xoá</button>
                                    </div>
                                    </div>
                                </div>
                                )} 
                                {/** Update*/}
                                  {selectedUpdate && (
                                    <div className="ModalOverlay" onClick={handleCloseModal}>
                                    <div  className="ModalContent" onClick={(e) => e.stopPropagation()}>
                                        <h3 style={{marginLeft:"20px"}}>Cập nhật hồ sơ bệnh nhân</h3>
                                        <form style={{display:"flex",flexDirection:"column"}}>
                                        <div className="info" style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                            <span>Họ và tên:</span>
                                            <input style={{padding:"5px",borderRadius:"10px"}}
                                            type="text"
                                            name="Name"
                                            value={updatedData.Name}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div className="info"  style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                            <span>Ngày sinh:</span>
                                            <input  style={{padding:"5px",borderRadius:"10px"}}
                                            type="date"
                                            name="DateOfBirth"
                                            value={updatedData.DateOfBirth}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div className="info"  style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                            <span>Số điện thoại:</span>
                                            <input  style={{padding:"5px",borderRadius:"10px"}}
                                            type="text"
                                            name="phone"
                                            value={updatedData.phone}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div className="info"  style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                            <span>Địa chỉ:</span>
                                            <input  style={{padding:"5px",borderRadius:"10px"}}
                                            type="text"
                                            name="address"
                                            value={updatedData.address}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div className="info" style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                        <span>Email:</span>
                                        <input
                                            style={{padding:"5px",borderRadius:"10px"}}
                                            type="email"
                                            name="email"
                                            value={updatedData.email}
                                            onChange={handleChange}
                                        />
                                        </div>
                                        <div className="info"  style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                            <span>Nghề Nghiệp:</span>
                                            <input  style={{padding:"5px",borderRadius:"10px"}}
                                            type="text"
                                            name="Job"
                                            value={updatedData.Job}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div className="info"  style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                            <span>CMND:</span>
                                            <input  style={{padding:"5px",borderRadius:"10px"}}
                                            type="text"
                                            name="CMND"
                                            value={updatedData.CMND}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div className="info"  style={{display:"flex",gap:"10px",alignItems:"center"}}>
                                            <span>Dân tộc:</span>
                                            <input  style={{padding:"5px",borderRadius:"10px"}}
                                            type="text"
                                            name="danToc"
                                            value={updatedData.danToc}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div style={{display:'flex' ,width:"100%"}}>
                                        <button className="closeBtn" style={{marginLeft:"0"}} onClick={handleCloseModal}>Đóng</button>
                                        <button type="button"  onClick={handleSubmit}>Lưu</button>
                                        </div>
                                       
                                        </form>
                                        
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
export default HoSoBenhNhan