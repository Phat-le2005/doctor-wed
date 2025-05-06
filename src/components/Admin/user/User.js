import "./user.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { getAllUserPaginate } from "../../../redux/action/userAction";
import { deleteUser } from "../../../service/userService";
import { toast } from "react-toastify";

const User = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { doctorInfo } = useSelector((state) => state.doctorInfo);

  useEffect(() => {
    fetchUserData();
  }, [page]);

  const fetchUserData = async () => {
    try {
      const res = await dispatch(getAllUserPaginate(page, 5));
      if (res?.errCode === 0) {
        setUserData(res.data);
        setPageCount(res.totalPages);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete =  async() => {
    setShowModal(false);
    
    setUserToDelete(null);
    await deleteUser(userToDelete.userId)
    
        toast.success("Xoa Thanh Cong")
        fetchUserData()
  };

  return (
    <div className="BodyUser">
      <div className="headerPage" >
                            <div className="group">
                                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                                <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input"/>
                            </div>
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                            <div style={{width:"40px",height:"40px",borderRadius:"50%",cursor:"pointer"}}>
                                <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={doctorInfo?.doctor.doctorImage}/>
                             </div>
                        </div>
                    </div>
<div className="Container">
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th style={{color: "#14B8A6"}}>ID người dùng</th>
              <th style={{color: "#14B8A6"}}>Tên người dùng</th>
              <th style={{color: "#14B8A6"}}>Email</th>
              <th style={{color: "#14B8A6"}}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td className="action-buttons">
                  <span
                    className="action delete"
                    title="Xoá"
                    onClick={() => handleDelete(user)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
{pageCount && pageCount>1 && <div className="btn-Paginate">
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
        </div>}
        

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>
                Bạn có chắc muốn xóa người dùng{" "}
                <strong>{userToDelete.userName}</strong>?
              </p>
              <div className="modal-actions">
                <button onClick={confirmDelete}>Xoá</button>
                <button onClick={() => setShowModal(false)}>Huỷ</button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default User;
