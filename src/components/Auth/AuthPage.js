import { useState } from "react";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin, createNewUserRedux } from "../../redux/action/userAction";

const AuthPage = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  
  const validatePhone = (phone) => {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegisterActive) {
      if (!email || !password || !phoneNumber || !firstName || !lastName) {
        toast.error("❌ Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("❌ Email không hợp lệ!");
        return;
      }
      if (!validatePhone(phoneNumber)) {
        toast.error("❌ Số điện thoại không hợp lệ!");
        return;
      }
      dispatch(createNewUserRedux({ email, password, phoneNumber, firstName, lastName }));
      toast.success("✅ Đăng ký thành công!");
      setIsRegisterActive(false);
      setEmail("")
      setPassword("")
      setFirstName("")
      setLastName("")
      setPhoneNumber("")
    } else {
      if (!email || !password) {
        toast.error("❌ Vui lòng nhập email và mật khẩu!");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("❌ Email không hợp lệ!");
        return;
      }
      const res = await dispatch(doLogin({ email, password }));
      if (res.success) {
        toast.success("✅ Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error("❌ Đăng nhập thất bại!");
      }
    }
  };

  return (
    <div className={`container ${isRegisterActive ? "right-panel-active" : ""}`} id="container">
      {/* Register Form */}
      <div className="form-container register-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input type="text" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
      {/* Login Form */}
      <div className="form-container login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Already have an account? Log in here.</p>
            <button className="ghost" onClick={() => setIsRegisterActive(false)}>Login</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Join Us!</h1>
            <p>Create an account to start your journey.</p>
            <button className="ghost" onClick={() => setIsRegisterActive(true)}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;