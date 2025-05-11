import { useNavigate } from 'react-router-dom';
import './SpecialtyCard.scss'
const SpecialtyCard = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Xử lý sự kiện khi click vào card
    console.log(data.departmentId)
      navigate(`/specialty/${data.departmentId}`);
  
  };
    return (
      <div className='Carddd'  onClick={handleCardClick}>
        <div className='Hinhanh'>
          <img src={`http://localhost:8082${data.imageDepartment}`} alt={data.departmentName} />
        </div>
        <div className='infor'>
          <div className='Name'>{data.departmentName}</div>
          <div className='trieuChung'><span>Triệu chứng:</span></div>
          <div className='list'><span > {data.departmentDescription.split('\n').map((line, index) => (
    <div key={index}>{line}</div>
  ))}</span></div>
        </div>
      </div>
    );
  };
export default SpecialtyCard