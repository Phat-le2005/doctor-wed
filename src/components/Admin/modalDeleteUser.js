import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { DeleteUser } from '../../../services/ApiService';
import {  toast } from 'react-toastify';
function ModalDeleteUser(props) {
  const {show, setShow,DataDelete} = props;

  const handleClose = () => setShow(false);
  const HandleDelete = async() => {
        // let data=await DeleteUser(DataDelete.id)
        // if(data && data.EC===0){
        //   toast.success(data.EM);
        //   handleClose();
        //   props.setcurrentpage(1)
        //   await props.FetchListUserWithPaginate(1);
        // }
        // if(data && data.EC!==0){
        //   toast.error(data.EM);
        // }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete The User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this User. Email: <b>{DataDelete && DataDelete.email ? DataDelete.email : ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=> HandleDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;