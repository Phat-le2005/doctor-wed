import './Select_doctor.scss'
import footer from '../../assets/image/Footer.png'
import iconArrow from '../../assets/icon/Polygon2.png'
import Hospital from '../../assets/icon/iconHospital.png'
import Ck from '../../assets/icon/iconCk.png'
import Doctor from '../../assets/icon/iconDoctor.png'
import sex from '../../assets/icon/sex.png'
import Schedule from '../../assets/icon/Schedule.png'
import doctor2 from '../../assets/icon/doctor2.png'
import Ck2 from '../../assets/icon/Ck2.png'
import { useParams } from 'react-router-dom'
import { useDoctor } from './doctorContext'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {getDoctorsBySpecialty} from "../../service/specialtyService"
const Select_doctor = () =>{
    const {id: specialtyId} = useParams()
    console.log(specialtyId)
    const [datafullDoctor,setDatafullDoctor] = useState(null)
     const { dataDoctor,
            setDataDoctor,
            loading,
            setLoading,
            specialty,
            setSpecialty,
            dataSchedule,
            setDataSchedule, } = useDoctor();
    useEffect(() => {
        const handleBeforeUnload = (e) => {
          e.preventDefault();
          e.returnValue = ''; // Hiển thị popup mặc định
        };
      
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
    useEffect(() => {
      const fetchSpecialty = async () => {
        try {
          setLoading(true);
          const res = await getDoctorsBySpecialty(specialtyId,1,5 );
          console.log(res)
          if (res.errCode === 0 && res.data.length > 0) {
            
            setSpecialty(res.specialtyInfo);
            setDatafullDoctor(res.data)
          } else {
            toast.error("Không tìm thấy thông tin bác sĩ");
          }
        } catch {
          toast.error("Chưa Đăng Nhập");
        } finally {
          setLoading(false);
        }
      };
      fetchSpecialty();
    }, [specialtyId]);
    useEffect(() => {
        const handleBeforeUnload = (e) => {
          e.preventDefault();
          e.returnValue = ''; // Hiển thị popup mặc định
        };
      
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
      const navigate = useNavigate()
      const choiceDoctor = (data) =>{
          setDataDoctor(data)
          setTimeout(() => {
              navigate(`/appointment/select_day`);
            }, 0);
      }
      if (loading) {
        return <div>Loading...</div>;
      }
    return(
          <div className='Sd-body'>
                    <div className='Container'>
                        <div className="Text">
                            <span>Trang Chu</span>
                            <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                            <span >{specialty?.department?.departmentName}</span>
                            <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                            <span style={{color:"#35B8FF"}}>Chọn Bác Sĩ</span>
                        </div>  
                        <div className='Content'>
                            <div className='Infor'>
                                <div className='TInfor'>
                                    <span>
                                        Thông Tin Y Tế Cơ Sở
                                    </span>
                                </div>
                                <div className='KInfor'>
                                    <div className='item'>
                                        <img src={Hospital}></img>
                                        <span>Bệnh viện Đại học Y Dược TP.HCM</span>
                                    </div>
                                    <div className='item'>
                                    <span >Cơ sở 215 Hồng Bàng, Phường 11, Quận 5, TP.HCM</span>
                                    </div>
                                    <div className='item'>
                                        <img src={Ck2}></img>
                                        <span>Bệnh Lý : {specialty?.specialtyName} </span>
                                    </div>
                                    <div className='item'>
                                        <img src={Ck}></img>
                                        <span>Chuyên khoa : {specialty?.department?.departmentName} </span>
                                    </div>
                                </div>
        
                            </div>
                            <div className='Action'>
                                <div className='TAction'>
                                    <span>Vui Lòng Chọn Bệnh Lý</span>
                                </div>
                                <div className='KAction'>
                                    <div className="group">
                                        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                                        <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input"/>
                                    </div>
                                    <div className='dv'>
                                        <div className='item'>Học Hàm/Học Vị</div>
                                        <div className='item'>Giới Tính</div>
                                    </div>
                                    <div className='PAction'>
                                        {datafullDoctor && datafullDoctor.length>0 && datafullDoctor.map((item,index)=>{
                                            return(
                                                  <div className='itemm' key={index} onClick={() => choiceDoctor(item)}>
                                                  <div className='list'>
                                                      <img src={doctor2}></img>
                                                      <span style={{color:"#FFD700"}}>{item?.position} | {item?.doctorName}</span>
                                                  </div>
                                                  <div className='list'>
                                                      <img src={sex}></img>
                                                      <span>Gioi Tinh: {item?.sex === true ? "Nam" :"Nữ"}</span>
                                                  </div>
                                                  <div className='list'>
                                                      <img src={Ck2}/>
                                                      <span>Chuyen Khoa: {specialty?.department?.departmentName}</span>
                                                  </div>
                                                  <div className='list'>
                                                      <img src={Schedule}></img>
                                                      <span>Lich Kham: Thu2,thu 3,thu 4</span>
                                                  </div>
                                              </div>
                                        )})}
                                       
                                        
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div> 
                    <img src={footer} style={{width:"100%",height:"321px"}}></img>
                </div>
    )
}
export default Select_doctor