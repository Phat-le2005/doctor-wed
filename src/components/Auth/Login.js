import { useState,useEffect } from "react"
import './Login.scss'
import { useNavigate } from "react-router-dom"
import { Bounce } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FaSpinner } from "react-icons/fa";
const Login = (props) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };
    const HandleLogin = async() =>{
        const res= await dispatch(doLogin({email,password}))
        if(!email||!password){
            toast.error('❌ Vui lòng nhập đày đủ thông tin yêu cầu', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }
        if(!validateEmail(email)){
            toast.error('❌ Sai dinh dang Email', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setEmail("");
            setPassword("")
            return;
        }
        setLoading(true)
        if(res.success==true){
            setTimeout(()=>{
                toast.success("Dang Nhap Thanh Cong",{
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setEmail("")
                setPassword("")
                setLoading(false)
                navigate('/');
            },2000)
            return;

          }
          if(res.success == false){
            toast.error('❌ Dang nhap that bai', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setLoading(false)
            return;
          }
    }
    return(
        <div className="Login-container">
            <div className="Header ">
                <span>Don't have an account yet?</span>
                <button onClick={()=>{navigate('/Register')}}>Sign Up</button>
                </div>
            <div className="Title col-4 mx-auto">
                Login
            </div>
            <div className="Welcome col-4 mx-auto">Hello,Who's this</div>
            <div className="Content col-4 mx-auto">
                <div className="from-group">
                    <label>Email</label>
                    <br></br>
                    <input type={'email'} 
                    value={email} 
                    className="from-control" 
                    onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="from-group">
                    <label>Password</label>
                    <br></br>
                    <input type={'password'} 
                    value={password} 
                    className="from-control" 
                    onChange={(event) => setPassword(event.target.value)}/>
                    
                </div>
                <span className="forget-password">Forget Password</span>
                <div>
                <button className="btn-submit"
                onClick={()=>HandleLogin()}
                disabled={loading}
                >
                  {loading && <FaSpinner className="loader-icon" />}

                    <span>Login</span>
                </button>
                </div>
                <div className="text-center">
                    <span onClick={()=>{navigate('/')}}>&#60;&#60;Go To Homepage</span>
                </div>
            </div>
            

        </div>
    )
}
export default Login