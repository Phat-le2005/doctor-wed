import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import './modalViewUsers.scss';

const ModalViewUsers = (props) => {
  const { show, setShow, DataUpdate, resetUpdateUser } = props;

  const handleClose = () => {
    setShow(false);
    resetUpdateUser();
    setEmail("");
    setphoneNumber("")
    setaddress("")
    setUsername("");
    setPreviewImage("");
    setSex("")
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address,setaddress]= useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [sex,setSex] = useState("")
  useEffect(() => {
    if (!_.isEmpty(DataUpdate)) {
      setEmail(DataUpdate.email || "");
      setUsername(DataUpdate.firstName+DataUpdate.lastName || "");
      if (DataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${DataUpdate.image}`);
      } else {
        setPreviewImage("");
      }
    }
  }, [DataUpdate]);

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className="modal-view-user">
      <Modal.Header closeButton>
        <Modal.Title>View User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} disabled />
          </div>
          {/* <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} disabled />
          </div> */}
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} disabled />
          </div>
          {/* <div className="col-md-6">
            <label className="form-label">Role</label>
            <input type="text" className="form-control" value={role} disabled />
          </div> */}
          <div className="col-md-12">
            <label className="form-label">User Image</label>
            <div className="img-preview border p-2 rounded">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="img-fluid" />
              ) : (
                <span className="text-muted">No image available</span>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewUsers;
