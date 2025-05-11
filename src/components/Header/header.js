import './Header.scss'
import { FaTiktok,FaFacebookF ,FaYoutube} from "react-icons/fa";
import { FaInstagram,FaUser } from "react-icons/fa6";
import logo from '../../assets/image/BVdaihocyduoc.png';
import headphone from '../../assets/icon/garden_headset.png'
import {  useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/action/userAction';
import { useDispatch } from 'react-redux';
const Header = ()=> {
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin.userLogin);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch()
    const handleChangePage = () => {
        if (!userLogin) {
            navigate("/register");
        } else {
            setShowDropdown(!showDropdown);
        }
    };
    const handleChangePageHoso = () =>{
        navigate('/hosobenhnhan')
        setShowDropdown(false)
    }
    const handleChangePagePKB = () =>{
        navigate('phieukhambenh')
        setShowDropdown(false)
    }
    const handleLogout = () => {
        dispatch(logout()).then(() => {
            
              navigate("/homepage");
            
          });
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    console.log(userLogin)
  return (
    <>
    <header className='header-container '>
         <div className="logo">
           <img src={logo} title='anh nen' alt="Logo của bệnh viện" ></img>
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
                        <button className="account-btn" onClick={handleChangePage}>
                            <FaUser /> {userLogin ? userLogin.userName : 'Tài khoản'}
                        </button>

                        {showDropdown && userLogin && (
                            <div className="account-dropdown">
                                <div className="dropdown-header">
                                    <FaUser />
                                    <div>
                                        <small>Xin chào</small><br />
                                        <strong>{userLogin.userName}</strong>
                                    </div>
                                </div>
                                <div className='dropdown-content'>
                                    <div className='item' onClick={()=>handleChangePageHoso()}>
                                        Hồ Sơ Bệnh Nhân
                                    </div>
                                    <div className='item' onClick={()=> handleChangePagePKB()}>
                                        Phiếu Khám Bệnh
                                    </div>
                                    <div className='item'>
                                       Tra Cứu Hồ Sơ
                                    </div>
                                    <hr></hr>
                                    <div className='item' onClick={()=>handleLogout()}>Đăng Xuất</div>

                                </div>
                            </div>
                        )}
        </div>
    </div>

    <div className="header-bottom">
        <div className="hotline">
            <img src={headphone} alt="headphone" ></img> 
            <div>
                Hỗ Trợ Đặt Khám
                <br></br>
            <strong>1900 2115</strong>
            </div>
        </div>
        <nav className="header-list">
            <ul>
                <li >  
                        <span style={{top:"1px",fontWeight:"600"} } onClick={()=>navigate("/department")}>Khám Chuyên Khoa</span>
                   
                  </li>
                  <li > 
                  <span style={{top:"1px",fontWeight:"600"} } onClick={()=>navigate("/doctor_service")}>Khám Theo Bác Sĩ</span>
                  
                        
                  </li>
                <li className='temp' ><span style={{fontWeight:"600"}}>Khám sức khỏe doanh nghiệp</span></li>
                <li className='temp' ><span style={{fontWeight:"600"}}> Hướng Dẫn</span></li>
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