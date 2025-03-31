import iconArrow from '../../assets/icon/Polygon2.png'
import "../Specialty/Specialty.scss"
import ChuyenKhoa from '../../assets/image/ChuyenKhoa.png'
import SpecialtyCard from './SpecialtyCard'
import Footer from '../Footer/Footer'
const Specialty =() =>{
    return(
        <div className="bodyy">
            <div className="Banner">
                <img src={ChuyenKhoa}></img>
                <div className="Text">
                    <span className='TrangChu'>Trang Chu</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span style={{color:"#35B8FF"}}>Khám Theo Chuyên Khoa</span>         
                </div>
                  <div className="group">
                    <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input"/>
                </div>
            </div>
            <div className='Content'>
                <SpecialtyCard/> 
                <SpecialtyCard/>
                <SpecialtyCard/>
                <SpecialtyCard/>
                <SpecialtyCard/>
                <SpecialtyCard/>
                <SpecialtyCard/>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default Specialty