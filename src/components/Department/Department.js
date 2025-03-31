import '../Department/Department.scss'
import iconArrow from '../../assets/icon/Polygon2.png'
import imageDe from '../../assets/image/Department.png'
const Department = () =>{
    return(
        <div className='bodyDepartment'>
             <div style={{  borderBottom: "2px solidrgb(79, 78, 78)"}}>
                    <img src={imageDe}></img>
                <div className='iconBanner'>
                    <span className='TrangChu'>Trang Chu</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span style={{color:"#35B8FF"}}>Khám Theo Bác Sĩ</span>
                </div>
                <span style={{fontSize:"48px",color:"#35B8FF",fontFamily:"Roboto",position:"relative",bottom:"300px",left:"600px"}}>Khoa Noi Tiet</span>
            </div>
        </div>
    )
}
export default Department