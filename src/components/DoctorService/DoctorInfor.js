import "../DoctorService/DoctorInfor.scss"
import iconArrow from '../../assets/icon/Polygon2.png'
import Footer from "../Footer/Footer"
import doctorImage from '../../assets/image/bacsitieuhoa.png'
const DoctorInfor = ()=>{
    return(
        <div className="body">
            <div className="Text">
                <span>Trang Chu</span>
                <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                <span >Khám Theo Bác Sĩ</span>
                <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                <span style={{color:"#35B8FF"}}>THS.BS Vu Thi Mai Uyen</span>
            </div>   
            <div className="Inforrr">
                <div className='Hinhanh'>
                    <img src={doctorImage}></img>
                </div>
            <div className='infor'>
                <div className='Name'>Ths.BS Vu Thi Mai Uyen</div>
                <div className='chuyenKhoa'><span>Chuyen Khoa: </span>Khoa Tieu Hoa</div>
                <div className='chuyenTri'><span>Chuyen Tri: </span>Viem da day,Ta Trang,....</div>
                <div className='LichKham'><span>Lich Kham: </span>Thu 2, Thu 3, Thu 4</div>
                <div className='Gioitinh'><span>Gioi Tinh: </span>Nu</div>
                </div>
                <div className='button'>
                    Dat Kham Ngay
                </div>
            </div>  
            <div className="Content">
                <div className="GioiThieu">
                    <span style={{color:"#35B8FF",fontSize:"25px",fontWeight:"500"}}>Gioi Thieu</span><br></br>
                    <span style={{fontSize:"18px",fontWeight:"500",marginLeft:""}}>
                    Bác sĩ Đoàn Thị Bích Vân là một chuyên gia nữ trong lĩnh vực da liễu, sở hữu nhiều năm kinh nghiệm đáng kể trong việc điều trị các vấn đề liên quan đến da.{<br></br>}
                    Bác sĩ Bích Vân có chuyên môn cao trong việc khám và chẩn đoán các bệnh da liễu đa dạng, bao gồm viêm da cơ địa, vẩy nến, nấm da, và nhiều tình trạng da khác. Sự tận tâm của bác không chỉ thể hiện qua kiến thức chuyên sâu mà còn qua khả năng tương tác tốt với người bệnh, tạo cảm giác tin tưởng và thoải mái trong quá trình điều trị.
                    </span>
                </div>
                <div className="HocVan">
                    <span style={{fontSize:"25px",fontWeight:"500"}}>Qua Trinh Dao Tao</span> <br></br>
                    <span style={{fontSize:"18px",fontWeight:"500"}}>
                    -Học chuyên khoa 1 tại Đại Học Y Dược TP. Hồ Chí Minh.{<br></br>}
                    -Tham gia lớp laser tại Bệnh viện Da Liễu TP. Hồ Chí Minh.{<br></br>}
                    -Tham gia lớp filer tại Đại Học Y Dược TP. Hồ Chí Minh.{<br></br>}
                    </span>
                    <span style={{fontSize:"25px",fontWeight:"500"}}>Qua Trinh Cong Tac</span><br></br>
                    <span style={{fontSize:"18px",fontWeight:"500"}}>-Năm 2021-2022: Phòng khám chuyên khoa da liễu Thành Đạt.<br></br>
                    -Năm 2023: Bệnh viện Đa khoa Hoàn Hảo.</span>
                </div>
            </div>
            <Footer></Footer>       
        </div>
    )
}
export default DoctorInfor