import doctorImage from '../../assets/image/bacsitieuhoa.png'
import "./DoctorCard.scss"
const doctorCard = ()=>{
    return(
        
        <div className='Card'>
            <div className='Hinhanh'>
                <img src={doctorImage}></img>
                <div className='Chitiet'>Xem Chi tiet</div>
            </div>
            <div className='infor'>
                <div className='Name'>Ths.BS Vu Thi Mai Uyen</div>
                <div className='chuyenKhoa'><span>Chuyen Khoa: </span>Khoa Tieu Hoa</div>
                <div className='chuyenTri'><span>Chuyen Tri: </span>Viem da day,Ta Trang,....</div>
                <div className='LichKham'><span>Lich Kham: </span>Thu 2, Thu 3, Thu 4</div>
                <div className='Gioitinh'><span>Gioi Tinh: </span>Nu</div>
            </div>
            <div className='buttonnn'>
                Dang Ky Ngay
            </div>
        </div>
        
    )
}
export default doctorCard