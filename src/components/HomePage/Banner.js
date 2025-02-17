import Bannner from "../../assets/image/banner.webp"
import "../HomePage/Banner.scss"
const Banner = ()=>{
    return(
        <div>
            
            <div className="Banner-Image">
                <img src={Bannner} title="Banner"/>
            </div>
              {/* Dịch Vụ Y Tế */}
      <section className="services">
        <div className="container">
          
          <div className="service-list">
            <div className="service-item">Đặt Khám Tại Cơ Sở</div>
            <div className="service-item">Đặt Khám Bác Sĩ</div>
            <div className="service-item">Gói Khám Sức Khỏe</div>
            <div className="service-item">Điều Dưỡng Tại Nhà</div>
            <div className="service-item">Xét Nghiệm Tại Nhà</div>
            <div className="service-item">Xét Nghiệm Tại Nhà</div>
          </div>
        </div>
      </section>
      
        </div>
    )
}
export default Banner