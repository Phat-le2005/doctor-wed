import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../DoctorService/DoctorInfor.scss";
import iconArrow from '../../assets/icon/Polygon2.png';
import Footer from "../Footer/Footer";
import {getDataDoctor} from "../../service/doctorService"
import { toast } from 'react-toastify';
const DoctorInfor = () => {
  const { id: doctorId } = useParams();
  const [dataDoctor, setDataDoctor] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state
  useEffect(()=>{
    FerchDataDoctor()
  },[doctorId])
  const FerchDataDoctor = async () => {
    try {
      const data = await getDataDoctor(doctorId);
      console.log("Dữ liệu trả về từ API:", data);
  
      if (data.errCode !== 0 || !data.data || data.data.length === 0) {
        toast.error("Không tìm thấy thông tin bác sĩ");
        return;
      }
  
      setDataDoctor(data.data[0]); // ✅ lấy object bác sĩ
    } catch (error) {
      toast.error("Lỗi khi tải thông tin bác sĩ");
    } finally {
      setLoading(false); // đừng quên tắt loading
    }
  };


  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

    return(
        <div className="body">
            <div className="Text">
                <span>Trang Chu</span>
                <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                <span >Khám Theo Bác Sĩ</span>
                <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                <span style={{color:"#35B8FF"}}> {dataDoctor?.position ? `${dataDoctor.position} ${dataDoctor.doctorName}` : "Đang tải..."}</span>
            </div>   
            <div className="Inforrr">
                <div className='Hinhanh'>
                    <img src={dataDoctor.doctorImage}></img>
                </div>
            <div className='infor'>
                <div className='Name'> {dataDoctor?.position ? `${dataDoctor.position} ${dataDoctor.doctorName}` : "Đang tải..."}</div>
                <div className='chuyenKhoa'><span>Chuyen Khoa: </span>{dataDoctor.Specialties[0].Department.departmentName} </div>
                <div className='chuyenTri'><span>Chuyen Tri: </span>{dataDoctor.Specialties.length>0 && dataDoctor.Specialties && dataDoctor.Specialties.map((item,index)=>item.specialtyName +", ")}</div>
                <div className='LichKham'><span>Lich Kham: </span>Thu 2, Thu 3, Thu 4</div>
                <div className='Gioitinh'><span>Gioi Tinh: </span>{dataDoctor.sex && dataDoctor.sex ? "Nam" : "Nữ"}</div>
                </div>
                <div className='button'>
                    Dat Kham Ngay
                </div>
            </div>  
            <div className="Content">
                <div className="GioiThieu">
                    <span style={{color:"#35B8FF",fontSize:"25px",fontWeight:"500"}}>Gioi Thieu</span><br></br>
                    <span style={{fontSize:"18px",fontWeight:"500",marginLeft:""}}>
                    {dataDoctor.introduce.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                    </span>
                </div>
                <div className="HocVan">
                    <span style={{fontSize:"25px",fontWeight:"500"}}>Qua Trinh Dao Tao</span> <br></br>
                    <span style={{fontSize:"18px",fontWeight:"500"}}>
                    {dataDoctor.HocVan.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                    </span>
                    <span style={{fontSize:"25px",fontWeight:"500"}}>Qua Trinh Cong Tac</span><br></br>
                    <span style={{fontSize:"18px",fontWeight:"500"}}> {dataDoctor.CongTac.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}</span>
                </div>
            </div>
            <Footer></Footer>       
        </div>
    )
}
export default DoctorInfor