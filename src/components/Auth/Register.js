import { useState } from "react"
import './Register.scss'
import { useNavigate } from "react-router-dom"
import { Bounce } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { createNewUserRedux } from "../../redux/action/userAction";
import { useDispatch,useSelector } from "react-redux";
const Register = (props) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phoneNumber,setphoneNumber] = useState("")
    const [firstName,setfirstName] = useState("")
    const [lastName,setlastName] = useState("")
    const [temp,setTemp] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };
    const validatePhoneNumber = (phoneNumber) => {
        const re = /^[0-9]{10,11}$/;  // Chỉ chấp nhận 10 hoặc 11 chữ số
        return re.test(phoneNumber);
    };
    const HandleRegister = async () => {
        if(!email||!password||!phoneNumber||!firstName||!lastName){
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
        if (!validateEmail(email)) {
            toast.error('❌ Email không hợp lệ. Vui lòng nhập đúng định dạng!', {
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
        if (!validatePhoneNumber(phoneNumber)) {
            toast.error('❌ Số điện thoại không hợp lệ! Vui lòng nhập 10 hoặc 11 chữ số.', {
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
        toast.success('Dang Ky Thanh Cong',{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
        dispatch(createNewUserRedux({ email, password, phoneNumber, firstName,lastName }));
        setEmail("");
        setPassword("");
        setfirstName(" ");
        setlastName("");
        setphoneNumber("");
        navigate("/")
    };
    const toggleShowPassword = () => {
        setTemp(!temp);
    };

    return(
        <div className="Register-container">
            <div className="Header ">
                <span>Go Back To Login Page</span>
                <button onClick={()=>navigate('/login')}>Go Back</button>
                </div>
            <div className="Title col-4 mx-auto">
                Register
            </div>
            <div className="Welcome col-4 mx-auto">Start Your Journey</div>
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
                    <input type={temp ? 'text' : 'password'} 
                    value={password} 
                    className="from-control" 
                    onChange={(event) => setPassword(event.target.value)}
                    />
                     <span onClick={()=>toggleShowPassword()} className="eye-icon ">{temp ? <FaEye/> : <FaEyeSlash/>}</span>
                </div>
                <div className="from-group">
                    <label>firstName</label>
                    <br></br>
                    <input type={'text'} 
                    value={firstName} 
                    className="from-control" 
                    onChange={(event) => setfirstName(event.target.value)}/>
                </div>
                <div className="from-group">
                    <label>LastName</label>
                    <br></br>
                    <input type={'text'} 
                    value={lastName} 
                    className="from-control" 
                    onChange={(event) => setlastName(event.target.value)}/>
                </div>
                <div className="from-group">
                    <label>phoneNumber</label>
                    <br></br>
                    <input type={'text'} 
                    value={phoneNumber} 
                    className="from-control" 
                    onChange={(event) => setphoneNumber(event.target.value)}/>
                </div>
                <div>
                <button className="btn-submit"
                onClick={()=>HandleRegister()}
                >Create My Free Account</button>
                </div>
                <div className="text-center">
                    <span onClick={()=>{navigate('/')}}>&#60;&#60;Go To Homepage</span>
                </div>
            </div>
            

        </div>
    )
}
export default Register