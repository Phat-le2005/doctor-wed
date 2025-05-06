import { useState,useRef,useEffect } from "react";
import "./KhoaPage.scss"
import { useSelector,useDispatch } from "react-redux";
import { createDepartment ,UpdateDepartment,DeleteDepartment} from "../../../service/departmentService";
import { toast } from "react-toastify";
import { getAllDepartment } from "../../../redux/action/departmentAction";
const KhoaPage = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedDeleteDepartment, setSelectedDeleteDepartment] = useState(null);
    const dispatch = useDispatch()
     const departments = useSelector((state) => state.departmentRender.listDepartment);
     const fetchDataDepartment = async () => {
         try {
           const res = await dispatch(getAllDepartment());
           if (!res || res.length === 0) {
             toast.error("Lỗi khi tải danh sách chuyên khoa");
             return;
           }
         } catch (error) {
           toast.error("Có lỗi xảy ra khi gọi API");
         }
       };
       useEffect(() => {
         fetchDataDepartment();
       }, []);
     const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      const handleSaveDepartment = async(newDepartment) => {
        try {
            const data = await createDepartment(newDepartment.departmentId,newDepartment)
                console.log(data)
                fetchDataDepartment();
        } catch (error) {
                toast.error(error)           
        }
      };
      const handleUpdateDepartment = async (departmentId, updatedDepartment) => {
        try {
          await UpdateDepartment(departmentId, updatedDepartment); // Truyền id
          toast.success("Cập nhật thành công");
          setSelectedDepartment(null);
          fetchDataDepartment();
        } catch (err) {
          toast.error("Lỗi khi cập nhật");
        }
      };
      const handleDeleteDepartment = async () => {
        try {
          await DeleteDepartment(selectedDeleteDepartment.departmentId);
          toast.success("Xóa thành công");
          fetchDataDepartment();
          setShowDeleteModal(false);
          setSelectedDeleteDepartment(null);
        } catch (err) {
          toast.error("Lỗi khi xóa");
        }
      };
     const CreateDepartmentModal = ({ onClose, onSave }) => {
        const modalRef = useRef();
        const handleOverlayClick = (e) => {
            if (e.target === modalRef.current) {
              onClose();
            }
          };
        const [form, setForm] = useState({
         departmentName: '',
          departmentDescription: '',
          imageDepartment: '',
        });
        const [confirmed, setConfirmed] = useState(false);
        const [preview, setPreview] = useState(null);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setForm({ ...form, [name]: value });
        };
      
        const handleImageChange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const base64 = await fileToBase64(file);
          setForm({ ...form, imageDepartment: base64 });
          setPreview(URL.createObjectURL(file));
        };
      
        const handleSave = () => {
            if (confirmed) {
              onSave(form); // Gửi dữ liệu tạo khoa lên parent component
              setIsCreating(false); // Đóng modal
            } else {
              alert("Vui lòng xác nhận thông tin trước khi lưu.");
            }
          };
        return (
          <div className="modal" ref={modalRef}
          onClick={handleOverlayClick}>
            <div className="modal-content"  >
              <h2>Tạo Khoa mới</h2>
      
              <input name="departmentName" placeholder="Tên Khoa" onChange={handleChange} />
              <textarea name="departmentDescription" placeholder="Mô tả triệu chứng" onChange={handleChange} />
      
              <label>Ảnh đại diện Khoa</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && <img src={preview} alt="preview" style={{ width: '100%', marginTop: 10 }} />}
      
              <div style={{ marginTop: 10}}>
                <input type="checkbox" onChange={(e) => setConfirmed(e.target.checked)} />
                
              
              </div>
      
              <button onClick={handleSave}  style={{backgroundColor:"#35B8FF",color:"#fff",fontSize:"16px",fontWeight:"600"}}>Lưu thông tin</button>
            </div>
          </div>
        );
      };
      const UpdateDepartmentModal = ({ onClose, onUpdate, initialData }) => {
        const [form, setForm] = useState({ ...initialData });
        const [preview, setPreview] = useState(initialData.imageDepartment); // Nếu base64 thì dùng trực tiếp
        const modalRef = useRef();
        const handleOverlayClick = (e) => {
            if (e.target === modalRef.current) {
              onClose();
            }
          };
        const handleChange = (e) => {
          const { name, value } = e.target;
          setForm({ ...form, [name]: value });
        };
      
        const fileToBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });
        };
      
        const handleImageChange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const base64 = await fileToBase64(file);
          setForm({ ...form, imageDepartment: base64 });
          setPreview(URL.createObjectURL(file)); // Hiển thị preview file mới
        };
      
        const handleUpdate = () => {
            onUpdate(form.departmentId, form); // Truyền thêm form.departmentId
          };
      
        return (
          <div className="modal" ref={modalRef}
          onClick={handleOverlayClick}>
            <div className="modal-content">
              <h2>Cập nhật Khoa</h2>
      
              <input
                name="departmentName"
                value={form.departmentName}
                onChange={handleChange}
              />
              <textarea
                name="departmentDescription"
                style={{height:"80px"}}
                value={form.departmentDescription}
                onChange={handleChange}
              />
      
              <label>Cập nhật ảnh</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "100%", marginTop: 10 }}
                />
              )}
      
              <button onClick={handleUpdate}  style={{mảginTop:"10px",backgroundColor:"#fff",color:"black",fontSize:"16px",fontWeight:"600"}}>Lưu cập nhật</button>
            </div>
          </div>
        );
      };
      const DeleteDepartmentModal = ({ onClose, onDelete, departmentName }) => {
        const modalRef = useRef();
      
        const handleOverlayClick = (e) => {
          if (e.target === modalRef.current) {
            onClose();
          }
        };
      
        return (
          <div className="modal" ref={modalRef} onClick={handleOverlayClick}>
            <div className="modal-content">
              <h2>Xác nhận xóa</h2>
              <p>Bạn có chắc chắn muốn xóa khoa "<strong>{departmentName}</strong>" không?</p>
              
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button onClick={onClose}>Hủy</button>
                <button style={{ backgroundColor: "red", color: "white" }} onClick={onDelete}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        );
      };
      
    return (
        <div className="BodyKhoa">
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
                    <div className="container">
      <div className="top-bar">
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
        <button className="create-btn" onClick={() => setIsCreating(true)}>➕ Tạo</button>
      </div>

      <div className="department-list">
        {departments.map((dep, index) => (
          <div className="department-card" key={index}>
            <img className="dept-image" src={dep.imageDepartment} alt={dep.departmentName} />
            <div className="dept-info">
              <h3>{dep.departmentName}</h3>
              <div className="symptoms">
                <strong>Triệu chứng:</strong>
                  {dep.departmentDescription}
              </div>
            </div>
            <div className="actions">
            <button className="edit-btn" onClick={() => setSelectedDepartment(dep)}>✏️</button>
            <button
  className="delete-btn"
  onClick={() => {
    setSelectedDeleteDepartment(dep);
    setShowDeleteModal(true); // <-- THÊM DÒNG NÀY
  }}
>
  🗑️
</button>
            </div>
          </div>
        ))}
      </div>

    </div>
    {isCreating && (
  <CreateDepartmentModal
    onClose={() => setIsCreating(false)}
    onSave={handleSaveDepartment}
  />
)}
{selectedDepartment && (
  <UpdateDepartmentModal
    onClose={() => setSelectedDepartment(null)}
    onUpdate={handleUpdateDepartment}
    initialData={selectedDepartment}
  />
)}
{showDeleteModal && selectedDeleteDepartment && (
  <DeleteDepartmentModal
    onClose={() => {
      setShowDeleteModal(false);
      setSelectedDeleteDepartment(null);
    }}
    onDelete={handleDeleteDepartment}
    departmentName={selectedDeleteDepartment.departmentName}
  />
)}
        </div>
    )
}
export default KhoaPage