import Backgorund from "../../assets/image/BackgroundDoctorAuth.jpg"
import "./AuthDoctor.scss"
import { useDispatch } from "react-redux"
import { DoctorLogin } from "../../redux/action/doctorAction"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
const AuthDoctor = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { doctorInfo } = useSelector((state) => state.doctorInfo);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(DoctorLogin(email, password));
        setEmail("");
        setPassword("");
    };

    useEffect(() => {
        if (doctorInfo?.doctor) {
            // Chờ 5 giây sau khi login thành công mới điều hướng
            
                if (doctorInfo.doctor.role === 2) {
                    navigate("/admin/tongquat");
                } else {
                    navigate("/doctorpage/inforpage");
                    // window.location.reload();
                }
            
        }
    }, [doctorInfo, navigate]);

    return (
        <div className="BodyAuthDoctor" style={{ backgroundImage: `url(${Backgorund})` }}>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AuthDoctor