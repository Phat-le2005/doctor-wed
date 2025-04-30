import "./InforPage.scss"
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { useSelector,useDispatch} from "react-redux";
import { useState,useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { UpdateEmailDoctor ,UpdatePhoneDoctor,UpdatePassDoctor} from "../../../service/doctorService";
const InforPage =()=>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
    const [showChangePhoneModal, setShowChangePhoneModal] = useState(false);
    const maskedPassword = "*".repeat(doctorInfo.user.doctorPass.length);
    const ChangePasswordModal = ({ onClose }) => {
       const modalRef = useRef();
       const [oldPass, setOldPass] = useState("");
      const [newPass, setNewPass] = useState("");
      const dispatch = useDispatch()
      const [confirmPass, setConfirmPass] = useState("");
          const handleOverlayClick = (e) => {
            // Nếu click vào phần nền (overlay) ngoài modal thì đóng
            if (e.target === modalRef.current) {
              onClose();
            }
          };
          const handleSubmit = async () => {
            if (newPass !== confirmPass) {
              toast.error("Mật khẩu mới và xác nhận không khớp");
              return;
            }
        
            await UpdatePassDoctor(dispatch, doctorInfo.user.doctorId, oldPass, newPass);
            onClose(); // Đóng modal sau khi thay đổi thành công (tuỳ chọn)
          };
        
        return (
          <div className="modal-overlay" ref={modalRef}
          onClick={handleOverlayClick}>
            <div className="modal-content slide-down">
              <span>Thay Đổi mật khẩu</span>
              <hr></hr>
              <input type="password" placeholder="Mật khẩu cũ"  value={oldPass} onChange={(e) => setOldPass(e.target.value)}/>
              <input type="password" placeholder="Mật khẩu mới" value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
              <input type="password" placeholder="Xác nhận mật khẩu" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
              <div className="Action">
                <button className="change-button" onClick={handleSubmit}>Thay đổi</button>
              </div>
             
            </div>
          </div>
        );
      };
      const ChangeEmailModal = ({ onClose }) => {
        const [email, setEmail] = useState("");
        const [confirmChange, setConfirmChange] = useState(false);
        const [loading, setLoading] = useState(false);
        const dispatch = useDispatch();
        const modalRef = useRef();
        const handleOverlayClick = (e) => {
          // Nếu click vào phần nền (overlay) ngoài modal thì đóng
          if (e.target === modalRef.current) {
            onClose();
          }
        };
        const handleChangeEmail = async () => {
          if (!confirmChange) {
            toast.error("Bạn cần xác nhận thay đổi email");
            return;
          }
      
          setLoading(true);
          await UpdateEmailDoctor(dispatch,doctorInfo.user.doctorId, email);
          setLoading(false);
          onClose(); // đóng modal sau khi hoàn tất
        };
      
        return (
          <div className="modal-overlay" ref={modalRef}
          onClick={handleOverlayClick}>
            <div className="modal-content slide-down">
              <span>Thay Đổi Email</span>
              <hr></hr>
              <input type="email" placeholder="Email"  value={email}
          onChange={(e) => setEmail(e.target.value)} />
              <div className="CheckBox">
              <input
            type="checkbox"
            checked={confirmChange}
            onChange={(e) => setConfirmChange(e.target.checked)}
          />
              <span >Xác Nhận Thay Đổi Email</span>
              </div>
              
              <div className="Action">
              <button
            className="change-button"
            onClick={handleChangeEmail}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Thay đổi"}
          </button>
              </div>
            </div>
          </div>
        );
      };
      const ChangePhoneModal = ({ onClose }) => {
        const modalRef = useRef();
        const dispatch = useDispatch()
        const [phone, setPhone] = useState("");
        const [confirmChange, setConfirmChange] = useState(false);
        const [loading, setLoading] = useState(false);
        const handleOverlayClick = (e) => {
          // Nếu click vào phần nền (overlay) ngoài modal thì đóng
          if (e.target === modalRef.current) {
            onClose();
          }
        };
        const handleChangePhone = async () => {
          if (!confirmChange) {
            toast.error("Bạn cần xác nhận thay đổi số điện thoại");
            return;
          }
      
          setLoading(true);
          await UpdatePhoneDoctor(dispatch, doctorInfo.user.doctorId, phone);
          setLoading(false);
          onClose();
        };
        return (
          <div className="modal-overlay" ref={modalRef}
          onClick={handleOverlayClick}>
            <div className="modal-content slide-down">
              <span>Thay Đổi Số Điện Thoại</span>
              <hr></hr>
              <input type="text" placeholder="Số Điện Thoại" value={phone}
          onChange={(e) => setPhone(e.target.value)}/>
              <div className="CheckBox">
              <input
            type="checkbox"
            checked={confirmChange}
            onChange={(e) => setConfirmChange(e.target.checked)}
          />
              <span >Xác Nhận Thay Đổi Số Điện Thoại</span>
              </div>
              
              <div className="Action">
              <button
            className="change-button"
            onClick={handleChangePhone}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Thay đổi"}
          </button>
              </div>
            </div>
          </div>
        );
      };
    return(
        <div className="bodyInforPage">
            <div className="headerPage" >
                <div style={{fontSize:"30px"}}><HiOutlineBars3></HiOutlineBars3></div>
                  <div className="group">
                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input"/>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                        <div  style={{fontSize:"30px",color:"#35B8FF",cursor:"pointer"}}>
                            <FaRegBell></FaRegBell>
                        </div>    
                        <div style={{width:"40px",height:"40px",borderRadius:"50%",cursor:"pointer"}}>
                            <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={doctorInfo.user.doctorImage}/>
                        </div>
                    </div>
            </div>
            <div className="Content">
                <div className="T-content">
                    <div className="ImageInfor">
                        <img src={doctorInfo.user.doctorImage}></img>
                    </div>
                    <div className="K-Infor">
                        <div className="item">
                            <span>ID Doctor:</span>
                            <span  className="item2">{doctorInfo.user.doctorId}</span>
                            <div></div>
                        </div>
                        <div className="item">
                            <span>Họ Và Tên:</span>
                            <span className="item2" >{doctorInfo.user.doctorName}</span>
                            <div></div>
                        </div>
                        <div className="item">
                            <span>Chức Vụ:</span>
                            <span  className="item2">{doctorInfo.user.position}</span>
                            <div></div>
                        </div>
                        <div className="item">
                            <span>Giới Tính:</span>
                            <span   className="item2">{doctorInfo.user.sex == true ? "Nam" : "Nữ"}</span>
                            <div></div>
                        </div>
                        <div className="item">
                            <span>Số Điện Thoại:</span>
                            <span  className="item2" >{doctorInfo.user.phoneNumber}</span>
                            <div className="item-Action" onClick={() => setShowChangePhoneModal(true)}>
                                <FaRegEdit></FaRegEdit>
                            </div>
                          
                        </div>
                        <div className="item">
                            <span>Email:</span>
                            <span  className="item2" >{doctorInfo.user.email}</span>
                            <div className="item-Action" onClick={() => setShowChangeEmailModal(true)}>
                                <FaRegEdit></FaRegEdit>
                            </div>
                        </div>
                        <div className="item">
                            <span>Password:</span>
                            <span  className="item2">{maskedPassword}</span>
                            <div className="item-Action" onClick={() => setShowChangePasswordModal(true)}>
                                <FaRegEdit></FaRegEdit>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contented">
                <div className="GioiThieu">
                <span style={{fontSize:"25px",fontWeight:"500"}}>Qua Trinh Dao Tao</span> <br></br>
                    <span style={{fontSize:"18px",fontWeight:"500"}}>
                    {doctorInfo.user.HocVan.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                    </span>
                </div>
                <div className="HocVan">
                 
                    
                    <span style={{fontSize:"25px",fontWeight:"500"}}>Qua Trinh Cong Tac</span><br></br>
                    <span style={{fontSize:"18px",fontWeight:"500"}}> {doctorInfo.user.CongTac.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}</span>
                </div>
            </div>

            </div>
            {showChangePasswordModal && (
                <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
            )}
            {showChangeEmailModal && (
                <ChangeEmailModal onClose={() => setShowChangeEmailModal(false)} />
            )}
             {showChangePhoneModal && (
                <ChangePhoneModal onClose={() => setShowChangePhoneModal(false)} />
            )}
        </div>
    )
}
export default InforPage