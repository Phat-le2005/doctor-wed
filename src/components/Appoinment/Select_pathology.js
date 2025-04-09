import './Select_pathology.scss'
import footer from '../../assets/image/Footer.png'
import iconArrow from '../../assets/icon/Polygon2.png'
import Hospital from '../../assets/icon/iconHospital.png'
import Ck from '../../assets/icon/iconCk.png'
import Doctor from '../../assets/icon/iconDoctor.png'
import { useDoctor } from './doctorContext'
import { useNavigate } from 'react-router-dom'
const Select_pathology = () =>{ 
    const { dataDoctor, loading,specialty,setSpecialty } = useDoctor();
    const navigate = useNavigate()
    const choiceSpecialty = (data) =>{
        setSpecialty(data)
        navigate(`/appointment/select_day/${dataDoctor.doctorId}`)
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    return(
        <div className='Sp-body'>
            <div className='Container'>
                <div className="Text">
                    <span>Trang Chu</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span >Chọn Bác Sĩ</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span style={{color:"#35B8FF"}}>Chọn Bệnh Lý</span>
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
                                <img src={Doctor}></img>
                                <span>{dataDoctor.position + " | "+ dataDoctor.doctorName} </span>
                            </div>
                            <div className='item'>
                                <img src={Ck}></img>
                                <span>Chuyên khoa : {dataDoctor.Specialties[0].Department.departmentName}  </span>
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
                            <div className='PAction'>
                                {dataDoctor.Specialties && dataDoctor.Specialties.length >0 && dataDoctor.Specialties.map((item,index)=>
                                                                <div className='itemm' key={index} onClick={() => choiceSpecialty(item)}>
                                                                 <span>{item.specialtyName}</span>
                                                                 <br></br>
                                                                 <span style={{fontSize:'15px',fontWeight:"400"}}>(Triệu chứng : {item.specialtyDescription})</span>
                                                             </div>
                                )}
       
                            </div>
                    </div>
                    </div>
                </div>
            </div> 
            <img src={footer} style={{width:"100%",height:"321px"}}></img>
        </div>
    )
}
export default Select_pathology