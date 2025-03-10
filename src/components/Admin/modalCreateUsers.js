import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
// import { PostCreateNewUser } from '../../../services/ApiService';
import {  toast } from 'react-toastify';
const FormData = require('form-data');
const ModalCreateUsers=(props)=> {
  const {show, setShow} = props;

  const handleClose = () =>{ 
    setShow(false);
    setemail("");
    setpassword("");
    setimage("");
    setrole("USER");
    setusername("");
  }
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [username,setusername] = useState("");
  const [image,setimage] = useState("");
  const [previewimage,setpreviewimage] = useState("")
  const [role,setrole] = useState("USER");
  const handleUploadimage = (event) => {
    if (event.target && event.target.files && event.target.files[0]){
    setpreviewimage(URL.createObjectURL(event.target.files[0]))
    setimage(event.target.files[0])
  }
  else {
    setpreviewimage("")
  }
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const handleSubmitUser = async() =>{
  const validemail = validateEmail(email);
  if(!validemail){
    toast.error('Sorry Wrong email')
    return;
  }
  if(!password){
    toast.error('enter your password');
    return;
  }

// let data=await PostCreateNewUser(email,password,username,role,image)
// console.log(">>> check res: ",data);
// if(data && data.EC===0){
//   toast.success(data.EM);
//   handleClose();
//   props.setcurrentpage(1);
//   await props.FetchListUserWithPaginate(1);
// }
// if(data && data.EC!==0){
//   toast.error(data.EM);
// }
}
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
      Add new user
      </Button> */}

      <Modal show={show} onHide={handleClose} size='xl' backdrop='static'className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <from className="row g-3">
  <div className="col-md-6">
    <label  className="from-label">Email</label>
    <br></br>
    <input type="email" className="from-control" value={email} onChange={(event)=> setemail(event.target.value)} />
  </div>
  <div className="col-md-6">
    <label  className="from-label">Password</label>
    <br></br>
    <input type="password" className="from-control" value={password} onChange={(event)=> setpassword(event.target.value)}/>
  </div>
  <div className="col-md-6">
    <label  className="from-label">Username</label>
    <br></br>
    <input type="text" className="from-control" value={username} onChange={(event)=> setusername(event.target.value)}/>
  </div>
  <div className="col-md-4">
    <label  className="from-label">Role</label>
    <br></br>
    <select  className="from-select" onChange={(event)=>setrole(event.target.value)}>
      <option defaultValue="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  </div>
  <div className="col-md-12">
  <label  className="from-label lable-upload" htmlFor='labelUpload'>
    <FcPlus/>
    Upload File Image
    </label>
  <input type="file" hidden id='labelUpload' onChange={(event)=>handleUploadimage(event)}/>
  </div>
  <div className="col-md-12 img-preview">
    {previewimage ? 
     <img src={previewimage}/>
     : <span>image</span>
    }
  
  </div>
</from>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSubmitUser()} >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalCreateUsers;