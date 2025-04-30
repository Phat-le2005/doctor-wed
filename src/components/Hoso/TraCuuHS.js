import "./TraCuuHS.scss"
import iconArrow from '../../assets/icon/Polygon2.png';
import { FaUserPlus } from "react-icons/fa";
import { get_Hoso } from '../../service/hoSoService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Footer from "../../assets/image/Footer.png"
import { CgDanger } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from "react";
const TraCuuHS = () =>{
    const userLogin = useSelector((state) => state.userLogin.userLogin);
    const [temp,setTemp] = useState(false)
    const navigate = useNavigate()
    const handleChange = (name) =>{
        if(name == 'Toa Thuoc'){
            setTemp(false)
        }
        else if(name == 'Lich Su'){
            setTemp(true)
        }

    }
    return(
        <div className="TraCuuHS">
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
                            <div className="item" onClick={()=>navigate("/phieukhambenh")}>
                                <span>
                                    Phiếu Khám Bệnh
                                </span>
                            </div>
                            <div className="item" style={{borderRight:"2px solid #35B8FF"}}>
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
                            <span>Tra Cứu Thông Tin</span>
                        </div>
                        <div className="list-Action">
                            <div className="btn" onClick={()=>handleChange('Toa Thuoc')} style={{backgroundColor: temp === true ? '#C9ECFF' : '#35B8FF',color: temp===true ? '#35B8FF' : '#fff'}}>
                               Toa Thuốc
                            </div>
                            <div className="btn" onClick={()=>handleChange('Lich Su')} style={{backgroundColor: temp === false ? '#C9ECFF' : '#35B8FF',color: temp===false ? '#35B8FF' : '#fff'}}>
                                Lịch Sử Khám bệnh
                            </div>
                        </div>
                        <div className="Content-card">
                            <div className="inputtt">
                                <span>Mã Lịch Hẹn</span>
                                <input placeholder="Nhập Mã"></input>
                            </div>
                            <div className="inputtt">
                                <span>Ngày Khám</span>
                                <input placeholder="DD/MM/YY"></input>
                            </div>
                            <div className="btn-tracuu">Tra Cứu</div>
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
export default TraCuuHS