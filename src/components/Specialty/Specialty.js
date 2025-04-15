import iconArrow from '../../assets/icon/Polygon2.png';
import "../Specialty/Specialty.scss";
import ChuyenKhoa from '../../assets/image/ChuyenKhoa.png';
import SpecialtyCard from './SpecialtyCard';
import Footer from '../Footer/Footer';
import { getAllDepartment } from "../../redux/action/departmentAction";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Specialty = () => {
  const [listCard, setListCard] = useState([]);
  const dispatch = useDispatch();



  const fetchDataDepartment = async () => {
    try {
      const res = await dispatch(getAllDepartment());
      if (!res || res.length === 0) {
        toast.error("Lỗi khi tải danh sách chuyên khoa");
        return;
      }
      setListCard(res);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gọi API");
    }
  };
  useEffect(() => {
    fetchDataDepartment();
  }, []);
  return (
    <div className="bodyy">
      <div className="Banner">
        <img src={ChuyenKhoa} alt="Chuyên Khoa" />
        <div className="Text">
          <span className="TrangChu">Trang Chủ</span>
          <img src={iconArrow} alt="Arrow" style={{ width: "10px", height: "10px" }} />
          <span style={{ color: "#35B8FF" }}>Khám Theo Chuyên Khoa</span>
        </div>
        <div className="group">
          <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input" />
        </div>
      </div>
      <div className="Content">
        {listCard && listCard.length > 0 ? (
          listCard.map((item, index) => (
            <SpecialtyCard key={index} data={item} />
          ))
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Specialty;
