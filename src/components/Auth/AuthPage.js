import './AuthPage.scss'
import ImageLogin from "../../assets/image/BackgroundLogin.png"
import { useState } from 'react';
import { sendOtp, verifyOtp } from "../../service/AuthService";
import { toast } from 'react-toastify';
import { getUserData } from '../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const AuthPage = () =>{
  const [showOtp, setShowOtp] = useState(false);
const [email, setEmail] = useState("");
const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
const navigate = useNavigate()
const dispatch = useDispatch()
const handleContinue = async (e) => {
  e.preventDefault();
  try {
    const result = await sendOtp(email);
    toast.success(result.message)
    setShowOtp(true);
  } catch (err) {
    toast.error(err.message || "Gửi OTP thất bại")
  }
};

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  const otp = otpDigits.join(""); // Gộp tất cả các chữ số OTP thành một chuỗi

  // Kiểm tra giá trị OTP
  console.log("OTP entered:", otp);
  console.log(email)
  try {
    const res = await verifyOtp(email, otp); // Gọi API verify OTP
    toast.success("Đăng nhập thành công ✅");
    await dispatch(getUserData())
    navigate("/homepage"); // Điều hướng đến trang chủ sau khi đăng nhập thành công
  } catch (err) {
    console.error("Error verifying OTP:", err); // Log lỗi
    toast.error(err.message || "Lỗi xác minh OTP");
  }
};

const handleOtpChange = (index, value) => {
  const newOtp = [...otpDigits];
  newOtp[index] = value;
  setOtpDigits(newOtp);
};

  return(
    <div className='Bodyyyyy' style={{display:"flex",flexDirection:"row"}}>
      <div className='formLogin'>
<form action="" class="form">
    <p style={{fontSize:"28px"}}>
        Welcome,<span>sign in to continue</span>
    </p>
    <button class="oauthButton">
                    <svg class="icon" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            <path d="M1 1h22v22H1z" fill="none"></path>
        </svg>
                    Continue with Google
                </button>
    <button class="oauthButton">
                    <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
        </svg>
                    Continue with Github
                </button>
    <div class="separator">
        <div></div>
        <span>OR</span>
        <div></div>
    </div>
    <input style={{width:"350px",height:"40px",padding:"10px",borderRadius:"10px"}} type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <button class="oauthButton" onClick={handleContinue}>
                    Continue
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
                </button>
</form>
      </div>
      <div style={{
  width: "60%",
  height: "736px", // bạn chỉnh cao tuỳ theo khung mong muốn
  overflow: "hidden"
}}>
  <img 
    src={ImageLogin}
    alt="Ảnh đăng nhập"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",          // crop ảnh để vừa khung
      objectPosition: "center" // lấy phần trên/giữa ảnh (có thể chỉnh)
    }}
  />
</div>
<div className={`Otp ${showOtp ? "show" : ""}`}>
<form class="form"  onSubmit={handleVerifyOtp}> 
  <div class="title">OTP</div> 
  <div class="title">Verification Code</div>
   <p class="message">We have sent a verification code to your mobile number</p> 
   <div className="inputs">
            {otpDigits.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={val}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
              />
            ))}
          </div> 
          <button class="action">verify me</button> 
    </form>
</div>
    </div>
  )
}
export default AuthPage