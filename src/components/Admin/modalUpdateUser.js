import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
// import { putUpdateUser } from '../../../services/ApiService';
import {  toast } from 'react-toastify';
import _ from 'lodash'

const FormData = require('form-data');
const ModalUpdateUsers=(props)=> {
  const {show, setShow,DataUpdate} = props;

  const handleClose = () =>{ 
    setShow(false);
    setemail("");
    setpassword("");
    setimage("");
    setrole("");
    setusername("");
    props.resetUpdateUser()
  }
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [username,setusername] = useState("");
  const [image,setimage] = useState("");
  const [previewimage,setpreviewimage] = useState("")
  const [role,setrole] = useState("");
  useEffect(()=>{
    if(!_.isEmpty(DataUpdate)){
        setemail(DataUpdate.email);
        setimage("");
        setrole(DataUpdate.role);
        setusername(DataUpdate.username);
        if(DataUpdate.image){
        setpreviewimage(`data:image/jpeg;base64,${DataUpdate.image}`)
        }
    }
  },[props.DataUpdate]);
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
// let data=await putUpdateUser(DataUpdate.id,username,role,image)
// console.log(">>> check res: ",data);
// if(data && data.EC===0){
//   toast.success(data.EM);
//   handleClose();
//   // props.setcurrentpage(1)
//   await props.FetchListUserWithPaginate(props.currentpage);
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
          <Modal.Title>Update new user</Modal.Title>
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
            <select  className="from-select" onChange={(event)=>setrole(event.target.value)} value={role}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="DOCTOR">Doctor</option>
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
export default ModalUpdateUsers;