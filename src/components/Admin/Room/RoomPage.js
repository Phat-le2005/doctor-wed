import "./RoomPage.scss";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getAllRoom, createRoom, DeleteRoom, UpdateRoom } from "../../../service/roomService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const RoomPage = () => {
  const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [userRoom, setRoomData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editData, setEditData] = useState(null);
  const [roomToDelete, setRoomToDelete] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    fetchRoomData();
  }, [page]);

  const fetchRoomData = async () => {
    try {
      const res = await getAllRoom(page, 10);
      if (res?.data.errCode === 0) {
        setRoomData(res.data.data);
        setPageCount(res.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleSaveRoom = async (formData) => {
    try {
      let res;
      if (editData) {
        // Update room
        console.log(editData)
        res = await UpdateRoom(editData.roomId,formData);
          toast.success("Cập nhật phòng thành công!");
      } else {
        // Create new room
        res = await createRoom(formData);
          toast.success("Tạo phòng thành công!");
      }
      fetchRoomData();
    } catch (error) {
      console.error("Lỗi tạo hoặc cập nhật phòng:", error);
    } finally {
      setIsCreating(false);
      setEditData(null);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      const res = await DeleteRoom(roomToDelete.roomId);
        toast.success("Xoá phòng thành công!");
        fetchRoomData();
    
    } catch (error) {
      toast.error("Lỗi khi xoá phòng.");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setRoomToDelete(null);
    }
  };

  const CreateRoomModal = ({ onClose, onSave, roomData }) => {
    const modalRef = useRef();
    const handleOverlayClick = (e) => {
      if (e.target === modalRef.current) {
        onClose();
      }
    };

    const [form, setForm] = useState(roomData || {
      roomNumber: '',
      floor: '',
      toa: '',
      roomDescription: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    const handleSave = () => {
      if (!form.roomNumber || !form.floor || !form.toa || !form.roomDescription) {
        toast.error("Vui lòng nhập đầy đủ thông tin.");
        return;
      }
      onSave(form);
      onClose();
    };

    return (
      <div className="modal" ref={modalRef} onClick={handleOverlayClick}>
        <div className="modal-content">
          <h2>{editData ? "Cập nhật Phòng" : "Thêm Phòng Mới"}</h2>
          <div className="form-group">
            <label>Số phòng</label>
            <input name="roomNumber" value={form.roomNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tầng</label>
            <input name="floor" value={form.floor} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tòa</label>
            <select name="toa" value={form.toa} onChange={handleChange}>
              <option value="">Chọn tòa</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="form-group">
            <label>Khoa</label>
            <select name="roomDescription" value={form.roomDescription} onChange={handleChange}>
              <option value="">Chọn khoa</option>
              <option value="Khoa Tiêu Hóa">Khoa Tiêu Hóa</option>
              <option value="Khoa Tai-Mui-Hong">Khoa Tai-Mui-Hong</option>
              <option value="Khoa Tim Mạch">Khoa Tim Mạch</option>
              <option value="Khoa Phụ Sản">Khoa Phụ Sản</option>
              <option value="Khoa Thần Kinh">Khoa Thần Kinh</option>
              <option value="Khoa Hô Hấp">Khoa Hô Hấp</option>
              <option value="Khoa Noi Tiet">Khoa Noi Tiet</option>
            </select>
          </div>
          <button onClick={handleSave} style={{ backgroundColor: "#35B8FF", color: "#fff", fontSize: "16px", fontWeight: "600" }}>
            Lưu thông tin
          </button>
        </div>
      </div>
    );
  };
  const DeleteRoomModal = ({ onClose, onConfirm, roomName }) => {
    const modalRef = useRef();
  
    const handleOverlayClick = (e) => {
      if (e.target === modalRef.current) {
        onClose();
      }
    };
  
    return (
      <div className="modal" ref={modalRef} onClick={handleOverlayClick}>
        <div className="modal-content">
          <h3>Xác nhận xoá phòng</h3>
          <p>Bạn có chắc muốn xoá phòng <strong>{roomName}</strong> không?</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              style={{ backgroundColor: "#EF4444", color: "#fff", padding: "8px 12px", fontWeight: 600 }}
              onClick={onConfirm}
            >
              Xoá
            </button>
            <button
              style={{ backgroundColor: "#94A3B8", color: "#fff", padding: "8px 12px", fontWeight: 600 }}
              onClick={onClose}
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="BodyRoom">
      <div className="headerPage">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g>
          </svg>
          <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}>
            <img style={{ width: "100%", height: "100%", borderRadius: "50%" }} src={doctorInfo?.doctor.doctorImage} />
          </div>
        </div>
      </div>

      <div className="Container">
        <div className="top-bar">
          <select className="filter-select">
            <option>Khoa</option>
            <option>Khoa Tiêu Hóa</option>
            <option>Khoa Tai-Mui-Hong</option>
            <option>Khoa Tim Mạch</option>
            <option>Khoa Phụ Sản</option>
            <option>Khoa Thần Kinh</option>
            <option>Khoa Hô Hấp</option>
            <option>Khoa Noi Tiet</option>
          </select>
          <button className="create-btn" onClick={() => setIsCreating(true)}>➕ Tạo</button>
        </div>
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th style={{ color: "#14B8A6" }}>ID Phòng</th>
                <th style={{ color: "#14B8A6" }}>Số Phòng</th>
                <th style={{ color: "#14B8A6" }}>Tòa</th>
                <th style={{ color: "#14B8A6" }}>Lầu</th>
                <th style={{ color: "#14B8A6" }}>Khoa</th>
                <th style={{ color: "#14B8A6" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {userRoom.length > 0 ? (
                userRoom.map((user) => (
                  <tr key={user.roomId}>
                    <td>{user.roomId}</td>
                    <td>{user.roomNumber}</td>
                    <td>{user.toa}</td>
                    <td>{user.floor}</td>
                    <td>{user.roomDescription}</td>
                    <td className="action-buttons">
                    <span
  className="action delete"
  title="Xoá"
  onClick={() => {
    setRoomToDelete(user);
    setIsDeleting(true);
  }}
>
  🗑️
</span>
                      <span className="edit-btn" onClick={() => { setEditData(user); setIsCreating(true); }}>✏️</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    Không tìm thấy phòng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {pageCount > 1 && (
            <div className="btn-Paginate">
              <ReactPaginate
                nextLabel=">>"
                previousLabel="<<"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                forcePage={page - 1}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          )}
        </div>
      </div>
      {isCreating && (
        <CreateRoomModal
          onClose={() => setIsCreating(false)}
          roomData={editData || { roomNumber: '', floor: '', toa: '', roomDescription: '' }}
          onSave={handleSaveRoom}
        />
      )}
      {isDeleting && roomToDelete && (
  <DeleteRoomModal
    roomName={roomToDelete.roomNumber}
    onClose={() => {
      setIsDeleting(false);
      setRoomToDelete(null);
    }}
    onConfirm={handleDeleteRoom}
  />
)}
    </div>
  );
};

export default RoomPage;
