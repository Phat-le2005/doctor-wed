import doctorImage from '../../assets/image/bacsitieuhoa.png'
import "./DoctorCard.scss"
import { Link, useNavigate } from 'react-router-dom';
const DoctorCard = ({data})=>{
    const listSpecialty = data.Specialties
    const navigate = useNavigate();

    const handleDoctorInforClick = () => {
      // Xử lý sự kiện khi click vào card
      console.log(data.doctorId)
        navigate(`/doctor_infor/${data.doctorId}`);
    
    };
    const handleAppointmentClick =()=>{
        navigate(`/appointment/select_pathology/${data.doctorId}`)
    }
    return(
        
        <div className='Card' >
            <div className='Hinhanh'>
                <img src={data.doctorImage}></img>
                <div className='Chitiet' onClick={handleDoctorInforClick}>Xem Chi tiet</div>
            </div>
            <div className='infor'>
                <div className='Name'>{data.position + " "+ data.doctorName}</div>
                <div className='chuyenKhoa'><span>Chuyen Khoa: </span>{data.Specialties[0].Department.departmentName}</div>
                <div className='chuyenTri'><span>Chuyen Tri: </span>{listSpecialty[0].specialtyName+", ..." }</div>
                <div className='LichKham'><span>Lich Kham: </span>Thu 2, Thu 3, Thu 4</div>
                <div className='Gioitinh'><span>Gioi Tinh: </span>{data.sex && data.sex ? "Nam" : "Nữ"}</div>
            </div>
            <div className='buttonnn' onClick={handleAppointmentClick}>
                Dang Ky Ngay
            </div>
        </div>
        
    )
}
export default DoctorCard