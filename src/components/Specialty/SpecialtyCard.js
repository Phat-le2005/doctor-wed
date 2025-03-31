import imageSpe from '../../assets/Khoa/NoiTiet.png'
import './SpecialtyCard.scss'
const SpecialtyCard = ()=>{
    return(
         <div className='Card'>
                    <div className='Hinhanh'>
                        <img src={imageSpe}></img>
                    </div>
                    <div className='infor'>
                        <div className='Name'>Khoa Noi Tiet</div>
                        <div className='trieuChung'><span>Triệu chứng :  </span></div>
                        <div className='list'><span>🔹 Đau bụng, buồn nôn, đầy hơi, khó tiêu{<br></br>}🔹 Vàng da, nước tiểu sẫm màu{<br></br>}🔹 Chướng bụng, sụt cân, tiêu chảy/táo bón </span></div>
                    </div>
                </div>
                
    )
}
export default SpecialtyCard