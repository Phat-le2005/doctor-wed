import "./DoctorPage.scss"
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getAllDoctorPaginate } from "../../../redux/action/doctorAction";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createDoctor,DeleteDoctor,UpdateRoleDoctor } from "../../../service/doctorService";
import { FaUserCog } from "react-icons/fa";
const DoctorPage = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [listDoctor, setListDoctor] = useState([]);
  
    const [isCreating, setIsCreating] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [doctorToUpdateRole, setDoctorToUpdateRole] = useState(null);

const handleUpdateRoleSuccess = () => {
  FetchListDoctorPaginate(page);
};
  const dispatch =useDispatch()
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };
  useEffect(()=>{
    FetchListDoctorPaginate(page)
  },[page])
      const FetchListDoctorPaginate = async(page) =>{
          let res = await dispatch(getAllDoctorPaginate(page,10));
          if(res.errCode === 0 ){
              console.log(res.data)
              setListDoctor(res.data)
              setPageCount(res.totalPages)
          }
      }
   
      const DoctorModal = ({ doctor, onClose }) => {
        if (!doctor) return null;
      
        return (
          <div className="doctor-modal-overlay">
            <div className="doctor-modal">
              <button className="close-btn" onClick={onClose}>×</button>
      
              <div className="modal-header">
                <img src={doctor.doctorImage || "/default-avatar.png"} alt="Doctor Avatar" className="modal-avatar" />
                <div className="modal-info">
                  <p><strong>ID Bác Sĩ:</strong> {doctor.doctorId}</p>
                  <p><strong>Tên Bác Sĩ:</strong> {doctor.doctorName}</p>
                  <p><strong>Chức vụ:</strong> {doctor.position}</p>
                  <p><strong>Giới tính:</strong> {doctor.sex == true ? "Nam" : "Nữ"}</p>
                  <p><strong>Số điện thoại:</strong> {doctor.phoneNumber}</p>
                  <p><strong>Email:</strong> {doctor.email}</p>
                  <p><strong>Khoa:</strong> {doctor?.Specialties[0]?.Department?.departmentName}</p>
                  <p><strong>Mật khẩu:</strong> {doctor.doctorPass}</p>
                </div>
              </div>
      
              <div className="modal-section">
                <h3>Học vấn</h3>
                {doctor?.CongTac ? (
  <div className="section-box">
    {doctor.HocVan.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ))}
  </div>
) : null}
              </div>
      
              <div className="modal-section">
                <h3>Công tác</h3>
                {doctor?.CongTac ? (
  <div className="section-box">
    {doctor.CongTac.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ))}
  </div>
) : null}
              </div>
            </div>
          </div>
        );
      };
      const DoctorCreateModal = ({ onClose }) => {
        const [doctor, setDoctor] = useState({
          doctorImage: '',
          doctorName: '',
          position: '',
          sex: true, // true for Male, false for Female
          phoneNumber: '',
          email: '',
          departmentId: '',
          doctorPass: '',
          hocVan: '',
          congTac: ''
        });
        const handleDepartmentChange = (e) => {
            setDoctor({
              ...doctor,
              departmentId: Number(e.target.value) // Chuyển giá trị thành số
            });
          };
        const modalRef = useRef();
        const handleCreate = async () => {
            setIsCreating(true);  // Show loading state
            if (validateForm()) {
              try {
                const doctorData = { ...doctor };
                const res = await createDoctor(doctorData);
                
                
                  toast.success("Bác sĩ đã được tạo thành công!");
                  setIsCreating(false); // Close modal
                  FetchListDoctorPaginate(page,10); // Reload the doctor list  
              } catch (error) {
                toast.error("Lỗi khi kết nối đến máy chủ");
                setIsCreating(false);  // Reset loading state
              }
            } else {
              setIsCreating(false); // Reset loading state if validation fails
            }
          };
    
        // Validate form inputs before creating doctor
        const validateForm = () => {
            if (!doctor.doctorName || !doctor.position || !doctor.phoneNumber || !doctor.email) {
                toast.error("Vui lòng điền đầy đủ thông tin!");
                return false;
            }
            return true;
        };
        const handleOverlayClick = (e) => {
          if (e.target === modalRef.current) {
            onClose();
          }
        };
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setDoctor((prevDoctor) => ({
            ...prevDoctor,
            [name]: value,
          }));
        };
      
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setDoctor((prevDoctor) => ({
                ...prevDoctor,
                doctorImage: reader.result // Lưu base64 string vào state
              }));
            };
            reader.readAsDataURL(file); // Chuyển ảnh thành base64
          }
        };
      
      
    
      
        return (
          <div className="doctor-modal-overlay" ref={modalRef} onClick={handleOverlayClick}>
            <div className="doctor-modal">
              <button className="close-btn" onClick={onClose}>×</button>
      
              <div className="modal-header">
                {/* <img 
                  src={doctor.doctorImage || "/default-avatar.png"} 
                  alt="Doctor Avatar" 
                  className="modal-avatar" 
                />
                  <label htmlFor="fileInput" className="upload-label">
                  Tải ảnh lên
                </label> */}
                {/* <input 
                  id="fileInput" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="file-input"
                /> */}
                <div className="modal-info">
                  <p>
                    <strong>Tên Bác Sĩ:</strong>
                    <input 
                      type="text" 
                      placeholder="Nhập tên bác sĩ" 
                      name="doctorName" 
                      value={doctor.doctorName} 
                      onChange={handleInputChange} 
                    />
                  </p>
                  <p>
                    <strong>Chức vụ:</strong>
                    <input 
                      type="text" 
                      placeholder="Nhập chức vụ" 
                      name="position" 
                      value={doctor.position} 
                      onChange={handleInputChange} 
                    />
                  </p>
                  <p>
                    <strong>Giới tính:</strong>
                    <select 
                      name="sex" 
                      value={doctor.sex} 
                      onChange={handleInputChange}
                    >
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </select>
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong>
                    <input 
                      type="text" 
                      placeholder="Nhập số điện thoại" 
                      name="phoneNumber" 
                      value={doctor.phoneNumber} 
                      onChange={handleInputChange} 
                    />
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <input 
                      type="email" 
                      placeholder="Nhập email" 
                      name="email" 
                      value={doctor.email} 
                      onChange={handleInputChange} 
                    />
                  </p>
                  <p>
  <strong>Khoa:</strong>
  <select 
    name="departmentId" 
    value={doctor.departmentId} 
    onChange={handleDepartmentChange}
  >
    <option value="">Chọn Khoa</option>
    <option value="1">Khoa Tiêu Hóa</option>
    <option value="2">Khoa Nội Tiết</option>
    <option value="3">	
    Khoa Nội Tim Mạch</option>
    <option value="4">Khoa Thần Kinh</option>
    <option value="5">Khoa Tai – Mũi – Họng</option>
    <option value="6">Khoa Phụ Sản</option>
    <option value="7">Khoa Hô Hấp</option>
    {/* Add more departments here */}
  </select>
</p>
                  <p>
                    <strong>Mật khẩu:</strong>
                    <input 
                      type="password" 
                      placeholder="Nhập mật khẩu" 
                      name="doctorPass" 
                      value={doctor.doctorPass} 
                      onChange={handleInputChange} 
                    />
                  </p>
                </div>
              </div>
      
              <div className="modal-section">
                <h3>Học vấn</h3>
                <textarea style={{width:"100%"}}
                  placeholder="Nhập thông tin học vấn"
                  name="hocVan"
                  value={doctor.hocVan}
                  onChange={handleInputChange}
                />
              </div>
      
              <div className="modal-section">
                <h3>Công tác</h3>
                <textarea style={{width:"100%"}}
                  placeholder="Nhập thông tin công tác"
                  name="congTac"
                  value={doctor.congTac}
                  onChange={handleInputChange}
                />
              </div>
      
              <div className="modal-footer">
                <button  onClick={handleCreate}>Lưu Thông Tin</button>
              </div>
            </div>
          </div>
        );
      };
      

const handleDeleteClick = (doctor) => {
  setDoctorToDelete(doctor);
};

const handleDeleteSuccess = () => {
  FetchListDoctorPaginate(page); // Reload danh sách sau khi xóa
};
      const DoctorDeleteModal = ({ doctor, onClose, onDeleteSuccess }) => {
        const [isDeleting, setIsDeleting] = useState(false);
        const modalRef = useRef();
        const handleOverlayClick = (e) => {
          if (e.target === modalRef.current) {
            onClose();
          }
        };
        const handleDelete = async () => {
          setIsDeleting(true);
          try {
            const res = await DeleteDoctor(doctor.doctorId);
              toast.success("Xóa bác sĩ thành công!");
              onDeleteSuccess(); // Gọi lại API hoặc cập nhật lại danh sách
              onClose();         // Đóng modal
            
          } catch (err) {
            toast.error("Đã có lỗi xảy ra khi kết nối máy chủ!");
          } finally {
            setIsDeleting(false);
          }
        };
      
        if (!doctor) return null;
      
        return (
          <div className="doctor-modal-overlay"  ref={modalRef} onClick={handleOverlayClick}>
            <div className="doctor-modal">
              <h3>Xác nhận xóa</h3>
              <p>Bạn có chắc muốn xóa bác sĩ <strong>{doctor.doctorName}</strong> không?</p>
              <div className="modal-footer">
                <button onClick={handleDelete} style={{width:"100px",height:"40px",border:"none",backgroundColor:"#35B8FF",color:"#fff"}} disabled={isDeleting}>
                  {isDeleting ? "Đang xóa..." : "Xác nhận"}
                </button>
              </div>
            </div>
          </div>
        );
      };
      const DoctorRoleUpdateModal = ({ doctor, onClose, onUpdateSuccess }) => {
        const [role, setRole] = useState(doctor?.role ?? 0); // Mặc định 0 nếu chưa có role
      
        const handleUpdateRole = async () => {
          if (!doctor?.doctorId) {
            toast.error("Không tìm thấy ID bác sĩ");
            return;
          }
      
          try {
            console.log(role)
            await UpdateRoleDoctor(dispatch, doctor.doctorId, role);
            onUpdateSuccess?.();
            onClose();
          } catch (err) {
            toast.error("Cập nhật thất bại!");
          }
        };
      
        return (
          <div className="doctor-modal-overlay">
            <div className="doctor-modal">
              <button className="close-btn" onClick={onClose}>×</button>
              <h3>Cập nhật Role cho bác sĩ</h3>
              <p><strong>ID:</strong> {doctor?.doctorId}</p>
              <p><strong>Tên:</strong> {doctor?.doctorName}</p>
      
              <p>
                <strong>Phân quyền:</strong>
                <select value={role} onChange={(e) => setRole(Number(e.target.value))}>
                  <option value={0}>Bác sĩ</option>
                  <option value={1}>Trưởng khoa</option>
                  <option value={2}>Admin</option>
                </select>
              </p>
      
              <div className="modal-footer">
                <button onClick={handleUpdateRole}>Cập nhật</button>
              </div>
            </div>
          </div>
        );
      };
      
    return (
        <div className="BodyDoctor">
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
        <div className="top-bar"><div>
        <select className="filter-select">
  <option value="">Khoa</option>
  <option value="">Chọn Khoa</option>
    <option value="1">Khoa Tiêu Hóa</option>
    <option value="2">Khoa Nội Tiết</option>
    <option value="3">	
    Khoa Nội Tim Mạch</option>
    <option value="4">Khoa Thần Kinh</option>
    <option value="5">Khoa Tai – Mũi – Họng</option>
    <option value="6">Khoa Phụ Sản</option>
    <option value="7">Khoa Hô Hấp</option>
</select>
<select className="filter-select">
  <option value="">Chức Vụ</option>
  <option value="BS">BS</option>
  <option value="BS.CKI">BS.CKI</option>
  <option value="BS.CKII">BS.CKII</option>
  <option value="ThS.BS">ThS.BS</option>
  <option value="TS.BS">TS.BS</option>
  <option value="GS.TS.BS">GS.TS.BS</option>
</select>
          </div>
          <button onClick={()=>setIsCreating(true) } className="create-btn">➕ Tạo</button>
        </div>
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th style={{ color: "#14B8A6" }}>ID Bác Sĩ</th>
                <th style={{ color: "#14B8A6" }}>Họ & Tên</th>
                <th style={{ color: "#14B8A6" }}>Chức Vụ</th>
                <th style={{ color: "#14B8A6" }}>Khoa</th>
                <th style={{ color: "#14B8A6" }}>Email</th>
                <th style={{ color: "#14B8A6" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listDoctor.length > 0 ? (
                listDoctor.map((user) => (
                  <tr key={user.doctorId}>
                    <td>{user.doctorId}</td>
                    <td>{user.doctorName}</td>
                    <td>{user.position}</td>
                    <td>{user?.Specialties[0]?.Department?.departmentName}</td>
                    <td>{user.email}</td>
                    <td className="action-buttons">
                    <span
  className="action delete"
  title="Xoá"
  onClick={() => handleDeleteClick(user)}
>
  🗑️
</span>
<span className="action-btn"
 onClick={() => setSelectedDoctor(user)}>👁️</span>   
 <span
  className="action-btn"
  onClick={() => setDoctorToUpdateRole(user)}
>
  <FaUserCog />
</span>      
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
      <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
        {isCreating && isCreating==true &&   <DoctorCreateModal onClose={()=>setIsCreating(false)} />}
        {doctorToDelete && (
  <DoctorDeleteModal 
    doctor={doctorToDelete} 
    onClose={() => setDoctorToDelete(null)} 
    onDeleteSuccess={handleDeleteSuccess} 
  />
  
)}
{doctorToUpdateRole && (
  <DoctorRoleUpdateModal
    doctor={doctorToUpdateRole}
    onClose={() => setDoctorToUpdateRole(null)}
    onUpdateSuccess={handleUpdateRoleSuccess}
/>
)}
      </div>
    )
}
export default DoctorPage