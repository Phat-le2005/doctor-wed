import Backgorund from "../../assets/image/BackgroundDoctorAuth.jpg"
import "./AuthDoctor.scss"
import { useDispatch } from "react-redux"
import { DoctorLogin } from "../../redux/action/doctorAction"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
const AuthDoctor = () =>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { doctorInfo } = useSelector((state) => state.doctorInfo);
    // Lấy state từ redux
    // const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const handlechangePage=() => {
        
        if (!doctorInfo){
            
            return
        }
        else if(doctorInfo?.doctor?.role==2){
            navigate("/admin/tongquat") 
        }
        else{
            navigate("/doctorpage/inforpage")
            // window.location.reload(); 
        }
    }
    // Gửi action login
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(DoctorLogin(email, password));
        handlechangePage()
        setEmail("")
        setPassword("")
    };
    return(
        <div className="BodyAuthDoctor" style={{ backgroundImage: `url(${Backgorund})` }}>
              <div className="wrapper">
                <form action="" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit" className="btn">Login</button>
                <div className="register-link">
                    <p>Dont have an account? <a href="#">Register</a></p>
                </div>
                </form>
            </div>
        </div>
    )
}
export default AuthDoctor