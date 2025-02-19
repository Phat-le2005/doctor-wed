import React from 'react';
import './HomePage.scss';
import Header from "../Header/HeaderUser"
import Bannner from "../../components/HomePage/Banner"
const HomePage = () => {
  return (
    <div className="homepage">
      <Header></Header>
      <Bannner></Bannner>
      {/* Banner */}


      {/* Cơ Sở Y Tế Hàng Đầu */}
      <section className="top-clinics">
        <div className="containerr">
          <h2>Cơ Sở Y Tế Hàng Đầu</h2>
          <div className="clinic-list">
            <div className="clinic-item">
            <img src="/assets/logo/BVhuyethoc.png" alt="Logo" />

            </div>
            <div className="clinic-item">Bệnh Viện B</div>
            <div className="clinic-item">Bệnh Viện C</div>
            <div className="clinic-item">Bệnh Viện D</div>
          </div>
        </div>
      </section>

      {/* Bác Sĩ Tư Vấn */}
      <section className="doctors">
        <div className="containerr">
          <h2>Bác Sĩ Tư Vấn</h2>
          <div className="doctor-list">
            <div className="doctor-item">Bác Sĩ 1</div>
            <div className="doctor-item">Bác Sĩ 2</div>
            <div className="doctor-item">Bác Sĩ 3</div>
            <div className="doctor-item">Bác Sĩ 4</div>
          </div>
        </div>
      </section>

      {/* Chăm Sóc Sức Khỏe Toàn Diện */}
      <section className="healthcare">
        <div className="containerr">
          <h2>Chăm Sóc Sức Khỏe Toàn Diện</h2>
          <p>Thông tin về các gói chăm sóc sức khỏe...</p>
        </div>
      </section>

      {/* Tải Ứng Dụng */}
      <section className="app-download">
        <div className="containerr">
          <h2>Tải Ứng Dụng Đặt Khám Nhanh</h2>
          <div className="download-buttons">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <img  alt="App Store" />
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <img  alt="Google Play" />
            </a>
          </div>
        </div>
      </section>

      {/* Truyền Thông Nói Về Chúng Tôi */}
      <section className="media">
        <div className="containerr">
          <h2>Truyền Thông Nói Về Chúng Tôi</h2>
          <div className="media-list">
            <div className="media-item">Báo Thanh Niên</div>
            <div className="media-item">Báo Tuổi Trẻ</div>
            <div className="media-item">Báo Dân Trí</div>
            <div className="media-item">Báo Người Lao Động</div>
          </div>
        </div>
      </section>

      {/* Thống Kê */}
      <section className="statistics">
        <div className="containerr">
          <h2>Thống Kê</h2>
          <div className="stat-list">
            <div className="stat-item">
              <span>3.0M+</span>
              <p>Lượt Khám</p>
            </div>
            <div className="stat-item">
              <span>300
</span>
              <p>Bác Sĩ</p>
            </div>
            <div className="stat-item">
              <span>500+</span>
              <p>Cơ Sở Y Tế</p>
            </div>
            <div className="stat-item">
              <span>1M+</span>
              <p>Người Dùng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="containerr">
          <div className="footer-info">
            <h3>Hệ Thống Đăng Ký Khám Bệnh</h3>
            <p>Cung cấp dịch vụ đặt lịch khám bệnh nhanh chóng và tiện lợi.</p>
          </div>
          <div className="footer-links">
            <h4>Liên Kết</h4>
            <ul>
              <li><a href="/">Trang Chủ</a></li>
              <li><a href="/dat-kham">Đặt Khám</a></li>
              <li><a href="/bac-si">Bác Sĩ</a></li>
              <li><a href="/lien-he">Liên Hệ</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Liên Hệ</h4>
            <p>Email: support@medbooking.vn</p>
            <p>Hotline: 1900 1234</p>
            <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MedBooking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;