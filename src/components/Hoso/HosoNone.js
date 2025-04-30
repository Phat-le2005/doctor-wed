import "./HosoNone.scss"
import iconComback from "../../assets/icon/comeback.png"
import iconArrow from '../../assets/icon/Polygon2.png'
import HosoBackground from "../../assets/image/HosoNone.png"
import Footer from "../../assets/image/Footer.png"
import { useDoctor } from '../Appoinment/doctorContext'
import { useNavigate } from "react-router-dom"
const HosoNone = () => {
    const navigate = useNavigate()
      const { dataDoctor,
           } = useDoctor();
    const handlecomeBack=()=>{
        setTimeout(() => {
            navigate(`/appointment/select_time/${dataDoctor.doctorId}`);
          }, 0);
    }
    const handleAddHoso = ()=>{
        setTimeout(() => {
            navigate(`/appointment/create_hoso`);
          }, 0);
    }
    return(
        <div className="bodyHoso">
            <img src={HosoBackground}></img>
              <div className='iconBanner'>
                <span className='TrangChu'>Trang Chu</span>
                <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                <span style={{color:"#35B8FF"}}>Hồ sơ bệnh nhân</span>
            </div>
            <div className="Action">
                <span onClick={()=>handlecomeBack()}>Quay Lại <img style={{width:"10px",height:"10px"}} src={iconComback}></img></span>
                <div onClick={()=>handleAddHoso()} className="btn-add">Thêm hồ sơ</div>
            </div>
            <div className="Footerrr">
                <img src={Footer}></img>
            </div>
        </div>
    )
}
export default HosoNone