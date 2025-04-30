import Backgorund from "../../assets/image/BackgroundDoctorAuth.jpg"
import "./AuthDoctor.scss"
import { useDispatch } from "react-redux"
import { DoctorLogin } from "../../redux/action/doctorAction"
import { useState } from "react"
import { useSelector } from "react-redux"
const AuthDoctor = () =>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Lấy state từ redux
    // const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);

    // Gửi action login
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(DoctorLogin(email, password));
        setEmail("")
        setPassword("")
    };
    return(
        <div className="BodyAuthDoctor" style={{ backgroundImage: `url(${Backgorund})` }}>
              <div class="wrapper">
                <form action="" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div class="input-box">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <i class='bx bxs-lock-alt' ></i>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit" class="btn">Login</button>
                <div class="register-link">
                    <p>Dont have an account? <a href="#">Register</a></p>
                </div>
                </form>
            </div>
        </div>
    )
}
export default AuthDoctor