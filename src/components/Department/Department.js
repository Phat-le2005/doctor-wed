import '../Department/Department.scss'
import iconArrow from '../../assets/icon/Polygon2.png'
import imageDe from '../../assets/image/Department.png'
import Footer from '../Footer/Footer'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { get_specialty } from '../../service/specialtyService';
import { useState,useEffect } from 'react';
import DepartmentCard from './DepartmentCard';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Department = () =>{
    const { id: departmentId } = useParams(); // Lấy departmentId từ URL
    const [listSpecialty,setListSpecialty] =useState([])
    const [searchKeyword, setSearchKeyword] = useState('');
    const [dataDep,setdataDep] = useState({})
    useEffect(() => {
      fetchSpecialtyData();
    }, [departmentId,searchKeyword]);
    const navigate = useNavigate();

  const handleChangeDep = (id) => {
    
      navigate(`/specialty/${id}`);
  
  };
    const fetchSpecialtyData = async () => {
      try {
        const res = await get_specialty(1,5,departmentId,searchKeyword);  // Gọi API để lấy chuyên ngành theo departmentId
        if (res && res.length > 0) {
          setListSpecialty(res);
        } else {
          toast.error("Không có chuyên ngành nào cho khoa này");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải chuyên ngành");
      }
    };
    const dataDe = ()=>{
      for (let i=0;i<listCard.length;i++){
        if(listCard[i].departmentId == departmentId){
          setdataDep(listCard[i])
          break;
        }
      }
    }
    const listCard = useSelector((state) => state.departmentRender.listDepartment);
  
    useEffect(() => {
      
      dataDe();
    }, [listCard,departmentId]);
    return(
        <div className='bodyDepartment'>
             <div className='Banner' style={{  borderBottom: "2px solidrgb(79, 78, 78)"}}>
                    <img src={imageDe}></img>
                <div className='iconBanner'>
                    <span className='TrangChu'>Trang Chu</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span style={{color:"#35B8FF"}}>Khám Theo Chuyên Khoa</span>
                </div>
                <span style={{fontSize:"48px",color:"#35B8FF",fontFamily:"Roboto",position:"relative",bottom:"300px",left:"600px"}}>{dataDep.departmentName}</span>
                <div className="group">
                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input placeholder="Tìm kiếm TriệU Chứng" type="search" className="input"  value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
                </div>
            </div>
            <div className='action'>
            {listCard && listCard.length > 0 ? (
                 listCard.map((item, index) => <div  className={`btnKhoa ${item.departmentId == departmentId ? 'active' : ''}`} key={item.departmentId} onClick={()=>handleChangeDep(item.departmentId)}>
                    <span>{item.departmentName}</span>
                </div>)
        ) : (
          <p>Không có dữ liệu</p>
        )}
                
            </div>
            <div className='Content'>
                <div className='content-main'>
                    <div className='departmentCard'>
                      {listSpecialty && listSpecialty.length > 0 ? (
                          listSpecialty.map((item,index)=><DepartmentCard data={item} Ck={dataDep.departmentName} key={index} />)
                      ):<p> Khong Co data</p>}
                        
                    </div>
                    <div className='inforr'>
                        <div className='ThongTinBV'>
                            <span>Video gioi thieu Benh Vien</span>
                            <div style={{height:"0.5px",backgroundColor:"black"}}></div>
                        </div>
                        <div className='TriAn'>
                            <span style={{ fontSize: "22px",
                        color: "#ff0000",
                        fontWeight: "600"}}>Goc Tri An</span>
                            <div style={{height:"0.5px",backgroundColor:"black"}}></div>
                            <span style={{fontWeight:"500"}}>Thư cảm ơn Khoa Tai Mũi Họng {<br></br>}
                            Trước đây, Cô là bệnh nhân luôn mang trong mình tâm lý lo sợ về bệnh tật. Nhưng từ khi được điều trị phẫu thuật và chăm sóc tại Khoa Tai Mũi Họng, Cô đã cảm giác được không khí ấm áp, chu đáo của các Bác sĩ nhân viên nơi đây, Cô thấy mình như đang được điều trị ở nhà... Chúc các con luôn nhiều sức khỏe và tinh thần an lạc..Ngày đến đêm luôn niềm nở ân cần, luôn đứng vững để sáng ngời y đức. (Cô. Nguyễn Thị Tuyết Hương).{<br></br>}
                            Cảm ơn toàn bộ Bác sĩ và nhân viên bệnh viện !{<br></br>}
                            Tôi bị u xơ và được các bác sĩ chỉ định mổ tại bệnh viện, do hoàn cảnh cá nhân không có người nhà đi kèm, tôi tự đi khám và mổ một mình, tâm trạng rất lo lắng, căng thẳng. Nhưng được sự thấu hiểu tâm lý yêu thương của các bác sĩ, các nữ hộ sinh và nhân viên ê kip mổ gây mê hồi sức,... đã giúp tôi an tâm, tin tưởng kết quả là sức khỏe, thể trạng và tinh thần tôi rất tốt, ổn định, vui vẻ, Tôi luôn biết ơn sự yêu thương người bệnh của tập thể bác sỹ bệnh viên mình, nhân viên tận tâm, nhiệt tình, yêu nghề,...dẫu thời gian ở bệnh viện không lâu nhưng đủ những cảm xúc tôi không thể nào quên, Xin chúc tất cả bác sĩ ngày càng yêu nghề, BV ĐHYD CS2 ngày càng phát triển,..Tôi xin chân thành cảm ơn (Nguyễn Thị Ánh Ngân).{<br></br>}
                            Trân trọng cảm ơn sự tận tình, chăm sóc điều trị{<br></br>}
                            Trong thời gian người nhà chúng tôi điều trị tại đây, chúng tôi đã nhận được sự tận tình chăm sóc, điều trị của đội ngũ y bác sĩ, điều dưỡng của Đơn vị Chấn thương Chỉnh hình, Đặc biệt xin cảm ơn đến ekip phẫu thuật...sự tận tâm này đã xua tan những nỗi đau và nỗi lo cho Má tôi là bà Huỳnh Thị Dung. Xin trân trọng cảm ơn bệnh viện đã tổ chức tốt một nơi khám chữa bệnh. Xin kính chúc toàn thể đội ngũ y bác sĩ và nhân viên y tế nhiều sức khỏe.(Nguyễn Tấn Hưng).{<br></br>}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default Department