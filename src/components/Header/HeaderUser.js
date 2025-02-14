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
    <header class="header-container">
         <div class="logo">
           <img src={logo} title='anh nen'></img>
        </div>
        <div className='header-content'>
    <div class="header-top">
        <div class="social-list">
            <a href="#"><FaTiktok/>  <span>Tiktok </span></a>
            <a href="#"><FaFacebookF /> <span>Facebook</span></a>
            <a href="#"><FaInstagram /><span>Instagram</span></a>
            <a href="#"><FaYoutube/> <span>Youtube</span></a>
        </div>
        <div class="header-action">
            <button class="app-btn">📱 Tải ứng dụng</button>
            <button class="account-btn"><FaUser/> Tài khoản</button>
            <div class="language">
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

    <div class="header-bottom">
        <div class="hotline">
            <i class="fas fa-headphones"></i> Hỗ trợ đặt khám 
            <strong>1900 2115</strong>
        </div>
        <nav class="header-list">
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