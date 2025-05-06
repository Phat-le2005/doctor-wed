import React, { useState, useEffect } from "react";
import banner1 from "../../assets/image/Banner1.jpg";
import banner2 from "../../assets/image/Banner2.jpg";
import banner3 from "../../assets/image/Banner3.jpg";
import Homepage from "../../assets/image/homepage.png";
import img1 from "../../assets/image/img1.webp";
import img2 from "../../assets/image/img2.webp";
import img3 from "../../assets/image/img3.webp";
import img4 from "../../assets/image/img4.webp";
import img5 from "../../assets/image/img5.webp";
import img6 from "../../assets/image/img6.jpg";
import img7 from "../../assets/image/img7.webp";
import img8 from "../../assets/image/img8.jpg";
import { useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import "../HomePage/HomePage.scss";
import { CiHospital1, CiMedicalCase } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { getAllDoctorPaginate } from "../../redux/action/doctorAction";
const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [banner1, banner2, banner3];
  const dispatch = useDispatch()
  const [listDoctor, setListDoctor] = useState([]);
  const imgList = [img1, img2, img3, img4, img5, img6, img7, img8];
  const [slideIndex, setSlideIndex] = useState(0);
  const FetchListDoctorPaginate = async() =>{
          let res = await dispatch(getAllDoctorPaginate(2,4));
          if(res.errCode === 0 ){
              console.log(res.data)
              setListDoctor(res.data)
          }
      }
      useEffect(()=>{
        FetchListDoctorPaginate()
      },[])
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % imgList.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="homepage">
      <div className="banner">
        <div className="slider">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? "active" : ""}
            />
          ))}
        </div>
        <button className="prev" onClick={prevImage}>&lt;</button>
        <button className="next" onClick={nextImage}>&gt;</button>
      </div>

      <div className="search-bar">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M10,2A8,8,0,1,0,18,10a8,8,0,0,0-8-8Zm0,14A6,6,0,1,1,16,10,6,6,0,0,1,10,16Z"></path>
          </svg>
          <input placeholder="Tìm kiếm ..." type="search" className="input" />
        </div>
      </div>

      <h2 className="section-title">Đội ngũ chuyên gia y tế hàng đầu</h2>
      <div className="doctors">
        {listDoctor.map((doctor, i) => (
          <div key={i} className="doctor-card">
            <div className="doctor-image">
              <img src={doctor.doctorImage} alt="Bác sĩ" />
            </div>
<div className="doctor-stats">
              <span>lượt khám : {1234}</span>
            </div>
            <div className="doctor-info">
              <p>{doctor?.position}</p>
              <h4>{doctor?.doctorName}</h4>
              <p><CiMedicalCase size={20}/> Khoa: {doctor?.Specialties[0]?.Department?.departmentName}</p>
              <p><CiHospital1 size={20}/>Bệnh viện đại học Y DƯỢC</p>
              <p><GoClock size={20}/>thời gian : 7:00 - 13:00</p>
              <button>Đăng ký ngay</button>
            </div>
          </div>
        ))}
      </div>

      <p className="view-all">Xem tất cả ➝</p>

      <div className="banner-stats">
        <img src={Homepage} alt="Homepage banner" />
      </div>

      <h3 className="section-title">Hệ thống cơ sở Y Tế Triển Khai</h3>

      <div className="image-slider">
        <div className="slider-track">
          {[0, 1, 2].map((offset) => {
            const img = imgList[(slideIndex + offset) % imgList.length];
            return <img key={offset} src={img} alt={`slide-${offset}`} />;
          })}
        </div>
      </div>
      <Footer></Footer>  
    </div>
  );
};

export default HomePage;
