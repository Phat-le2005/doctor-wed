import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../service/userService';

function ModalDeleteUser(props) {
  const { show, setShow, DataDelete, FetchListUserWithPaginate, setcurrentpage,currentpage,ListUser } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);

  const HandleDelete = async () => {
    if (!DataDelete?.id) {
      toast.error("Không tìm thấy ID người dùng!");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const data = await deleteUser(DataDelete.id);
      console.log("Response từ API xoá:", data); // ✅ Xem rõ phản hồi
  
      if (data && data.errCode === 0) {
        toast.success(data.errMessage);
  
        const nextPage = (currentpage > 1 && ListUser.length === 1)
          ? currentpage - 1
          : currentpage;
  
        setShow(false);
        setcurrentpage(nextPage);
        await FetchListUserWithPaginate(nextPage);
      } else {
        toast.error(data?.errMessage || "Lỗi không xác định khi xóa!");
      }
    } catch (error) {
      toast.error("Lỗi khi xóa người dùng!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete The User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this user? Email: <b>{DataDelete?.email || ""}</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} style={{ letterSpacing: 'normal' }}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={HandleDelete}
          disabled={isLoading}
          style={{ letterSpacing: 'normal' }}
        >
          {isLoading ? 'Deleting...' : 'Confirm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteUser;
