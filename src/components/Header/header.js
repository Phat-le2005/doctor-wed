import './Header.scss'
import { FaTiktok,FaFacebookF ,FaYoutube} from "react-icons/fa";
import { FaInstagram,FaUser } from "react-icons/fa6";
import logo from '../../assets/image/BVdaihocyduoc.png';
import headphone from '../../assets/icon/garden_headset.png'

function Header() {
  return (
    <>
    <header className='header-container '>
         <div className="logo">
           <img src={logo} title='anh nen'></img>
        </div>
        <div className='header-content'>
    <div className="header-top">
        <div className="social-list">
            <a href="#"><FaTiktok/>  <span>Tiktok </span></a>
            <a href="#"><FaFacebookF /> <span>Facebook</span></a>
            <a href="#"><FaInstagram /><span>Instagram</span></a>
            <a href="#"><FaYoutube/> <span>Youtube</span></a>
        </div>
        <div className="header-action">
            <button className="app-btn">📱 Tải ứng dụng</button>
            <button className="account-btn"><FaUser/> Tài khoản</button>
        </div>
    </div>

    <div className="header-bottom">
        <div className="hotline">
            <img src={headphone}></img> 
            <div>
                Hỗ Trợ Đặt Khám
                <br></br>
            <strong>1900 2115</strong>
            </div>
        </div>
        <nav className="header-list">
            <ul>
                <li > <span>Khám Chuyên Khoa</span>
                  </li>
                  <li > 
                        <span>Khám Theo Bác Sĩ</span>
                  </li>
                <li className='temp'><span>Khám sức khỏe doanh nghiệp</span></li>
                <li ><span>Hướng Dẫn</span></li>
            </ul>
        </nav>
    </div>
    </div>
  
    
</header>
<div className='frame'></div>
</>

  );
}

export default Header;