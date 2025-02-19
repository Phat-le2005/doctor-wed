import './Header.scss'
import { FaTiktok,FaFacebookF ,FaYoutube} from "react-icons/fa";
import { FaInstagram,FaUser } from "react-icons/fa6";
import logo from '../../assets/image/images.png';
import vietName from'../../assets/image/vietnam.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
function BasicExample() {
  const [show, setShow] = useState(false);
  return (
    <header className="header-container">
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
            <div className="language">
                <Dropdown>
                <Dropdown.Toggle variant="none" id="basic-nav-dropdown">
                <img src={vietName} alt="Vietnamese"/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
        </div>
    </div>

    <div className="header-bottom">
        <div className="hotline">
            <i className="fas fa-headphones"></i> Hỗ trợ đặt khám 
            <strong>1900 2115</strong>
        </div>
        <nav className="header-list">
            <ul>
                <li   onMouseEnter={() => setShow(true)} 
                       onMouseLeave={() => setShow(false)}
                      > <NavDropdown title="Co So Y Te" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                  </li>
                  <li   onMouseEnter={() => setShow(true)} 
                        onMouseLeave={() => setShow(false)}> 
                        <NavDropdown title="Dich Vu Y Te" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                  </li>
                <li><a href="#">Khám sức khỏe doanh nghiệp</a></li>
                <li  onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}> <NavDropdown title="Tin Tuc Y Te" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown></li>
                    <li   onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}> <NavDropdown title="Huong Dan" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown></li>
                <li><a href="#">Liên hệ hợp tác</a></li>
            </ul>
        </nav>
    </div>
    </div>
  
    
</header>

  );
}

export default BasicExample;