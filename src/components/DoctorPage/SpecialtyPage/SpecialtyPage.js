import './SpecialtyPage.scss'
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState,useRef } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { getSpecialtyByDoctor,CreateSpecialty,DeleteSpecialty,getDoctorsBySpecialty,getDoctor,CreateDS,DeleteDS,UpdateSpecialty } from '../../../service/specialtyService';
const SpecialtyPage = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const [listSpecialty,setListSpecialty] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [listDoctor,setDoctor] = useState([])
    useEffect(()=>{
        ferchDataSpecialty()
    },[])
    const ferchDataSpecialty = async () =>{
        const data = await getSpecialtyByDoctor(doctorInfo.doctor.departmentId)
        setListSpecialty(data.data)
    }
    const handleCreateSpecialty = async (formData) => {
        try {
          await CreateSpecialty(formData);
          ferchDataSpecialty(); // Refresh
        } catch (err) {
          console.error("Lỗi tạo chuyên khoa", err);
        }
      };
      const handleDeleteSpecialty = async (id) => {
        try {
          // Gọi API xóa chuyên khoa
          await DeleteSpecialty(id); // Giả sử bạn đã có hàm này trong `specialtyService.js`
          ferchDataSpecialty(); // Refresh lại danh sách
        } catch (err) {
          console.error("Lỗi khi xóa chuyên khoa:", err);
        }
      }
      const ModalTaoSpecialty = ({ onClose, onCreate }) => {
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [image, setImage] = useState(null);
        const [preview, setPreview] = useState(null);
      
        const modalRef = useRef(null);
        const handleImageChange = (e) => {
            const file = e.target.files[0];
            
            if (file) {
              const maxSize = 5 * 1024 * 1024; // Giới hạn kích thước file là 5MB
              
              if (file.size > maxSize) {
                alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
                return;
              }
          
              setImage(file);
          
              // Chuyển file thành chuỗi Base64 nếu cần
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreview(reader.result);
                setImage(reader.result); // Lưu chuỗi base64 vào state nếu cần
              };
              reader.readAsDataURL(file);
            }
          };
        const handleSubmit = () => {
          if (!name.trim() || !description.trim() || !image) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
          }
      
          const formData ={
            specialtyName: name,
            specialtyDescription: description,
            specialtyImage: image,
            departmentId: doctorInfo.doctor.departmentId
          };
        
          console.log(formData)
          onCreate(formData);
          onClose();
        };
      
        // Đóng modal khi click ra ngoài
        const handleOverlayClick = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
          }
        };
      
        useEffect(() => {
          document.addEventListener("mousedown", handleOverlayClick);
          return () => {
            document.removeEventListener("mousedown", handleOverlayClick);
          };
        }, []);
      
        return (
          <div className="modal-overlay">
            <div className="modal-content slide-down" ref={modalRef}>
              <h2 style={{fontSize:"20px",fontWeight:"600",marginLeft:"160px"}}>Tạo Chuyên Khoa Mới</h2>
      
              <label>Tên chuyên khoa:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
      
              <label>Mô tả chuyên khoa:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
      
              <label>Hình ảnh:</label>
              <input
  type="file"
  onChange={handleImageChange}
/>
                {preview && <img className="preview" src={preview} alt="preview" />}
      
              <div className="modal-actions">
                <button className='close-button ' style={{backgroundColor:"#35B8FF",color:"#fff",fontSize:"16px",fontWeight:"600"}} onClick={handleSubmit}>Tạo</button>
              </div>
            </div>
          </div>
        );
      };
      const ModalDeleteSpecialty = ({ onClose, onDelete, specialty }) => {
        const handleDelete = () => {
          onDelete(specialty.specialtyId);
          onClose();
        };
        const handleOverlayClick = (e) => {
            // Nếu click vào phần nền (overlay) ngoài modal thì đóng
            if (e.target === modalRef.current) {
              onClose();
            }
          };
        const modalRef = useRef(null);
        return (
          <div className="modal-overlay "  ref={modalRef} onClick={handleOverlayClick}>
            <div className="modal-content slide-down" >
              <h2 style={{fontSize:"20px",fontWeight:"600" ,marginLeft:"50px"}}>Chắc chắn muốn xóa chuyên khoa?</h2>
              <p>{specialty.specialtyName}</p>
              <div className="modal-actions">
                <button className="close-button" style={{backgroundColor:"#35B8FF",color:"#fff",fontSize:"16px",fontWeight:"600"}} onClick={handleDelete}>Xóa</button>
              </div>
            </div>
          </div>
        );
      };
      const ModalUpdateSpecialty = ({ onClose, onUpdate, specialty }) => {
        const [name, setName] = useState(specialty.specialtyName || '');
        const [description, setDescription] = useState(specialty.specialtyDescription || '');
        const [image, setImage] = useState(specialty.specialtyImage || null);
        const [preview, setPreview] = useState(specialty.specialtyImage || null);
        const [doctors, setDoctors] = useState([]); // Bác sĩ đã thuộc chuyên khoa
        const [searchResult, setSearchResult] = useState([]); // Kết quả tìm kiếm
        const [searchTerm, setSearchTerm] = useState('');
      
        const modalRef = useRef(null);
      
        const handleUpdateSpecialty = async () => {
          const confirmCheckbox = document.getElementById("confirm");
          if (!confirmCheckbox?.checked) {
            toast.error("Vui lòng xác nhận thông tin khám!");
            return;
          }
          if (!name.trim() || !description.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
          }
      
          try {
            await UpdateSpecialty(specialty.specialtyId, name, description, image);
            await DeleteDS(specialty.specialtyId);
            for (const doctor of doctors) {
              await CreateDS( doctor.doctorId,specialty.specialtyId);
            }
      
            setName("");
            setDescription("");
            setDoctors([]);
            toast.success("Đã lưu thông tin khám và toa thuốc!");
            onClose();
          } catch (error) {
            console.error(error);
            toast.error("Đã có lỗi xảy ra khi lưu thông tin.");
          }
        };
      
        useEffect(() => {
          fetchDoctors();
        }, [specialty.specialtyId]);
      
        const fetchDoctors = async () => {
          try {
            const data = await getDoctorsBySpecialty(specialty.specialtyId,1,10);
            setDoctors(data.data || []);
          } catch (err) {
            console.error("Lỗi khi lấy bác sĩ:", err);
          }
        };
      
        const handleSearch = async (e) => {
          const value = e.target.value;
          setSearchTerm(value);
          if (value.trim()) {
            try {
              const res = await getDoctor(value);
              setSearchResult(res|| []);
            } catch (err) {
              console.error("Lỗi tìm kiếm bác sĩ:", err);
            }
          } else {
            setSearchResult([]);
          }
        };
      
        const handleAddDoctor = (doctor) => {
          if (!doctors.find((d) => d.doctorId === doctor.doctorId)) {
            setDoctors([...doctors, doctor]);
          }
        };
        const handleRemoveDoctor = (doctorId) => {
          const updatedDoctors = doctors.filter((doc) => doc.doctorId !== doctorId);
          setDoctors(updatedDoctors);
        };
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const maxSize = 5 * 1024 * 1024;
          if (file.size > maxSize) return alert("File quá lớn!");
      
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        };
      
        const handleOverlayClick = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
          }
        };
      
        useEffect(() => {
          document.addEventListener("mousedown", handleOverlayClick);
          return () => document.removeEventListener("mousedown", handleOverlayClick);
        }, []);
      console.log(searchResult)
        return (
          <div className="modal-overlay">
            <div className="modal-content slide-down" ref={modalRef}>
              <h2>Cập nhật Chuyên Khoa</h2>
      
              <label>Tên chuyên khoa:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      
              <label>Mô tả chuyên khoa:</label>
              <div style={{width:"100%",height:"40px"}}>
              <textarea
              style={{width:"100%",height:"100%"}}
  value={description}
  rows={5}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Nhập mô tả..."
/>
              
              </div>

              <label style={{marginTop:"30px"}}>Danh sách bác sĩ:</label>
              <ul className="doctor-list">
                {doctors.map((doc) => (
                  <li key={doc.doctorId}>
                    👨‍⚕️ {doc.doctorName} - {doc.position}
                    <button
        className="remove-button"
        onClick={() => handleRemoveDoctor(doc.doctorId)}
      >
        <TiDeleteOutline /> {/* FontAwesome icon */}
      </button>
                  </li>
                ))}
              </ul>
      
              <label>Thêm bác sĩ:</label>
              <input
                type="text"
                placeholder="Nhập tên bác sĩ"
                value={searchTerm}
                onChange={handleSearch}
              />
              <ul className="search-suggestions">
                
                  {searchResult.map((doc) => (
                    <li key={doc.doctorId} onClick={() => handleAddDoctor(doc)}>
                      ➕ {doc.doctorName} 
                    </li>
                  ))}
      </ul>
              <label>Hình ảnh:</label>
              <input type="file" onChange={handleImageChange} />
              {preview && <img style={{height:"80px",width:"80px"}} className="preview" src={preview} alt="preview" />}
      
              <label style={{display:"flex",alignItems:"center",marginTop:"10px",gap:"10px"}}>
                <input type="checkbox" id="confirm" style={{width:"20px",height:"20px",marginTop:"10px"}} />
                Xác nhận cập nhật thông tin
              </label>
      
              <div className="modal-actions">
                <button className="close-button"  style={{backgroundColor:"#35B8FF",color:"#fff",fontSize:"16px",fontWeight:"600"}} onClick={handleUpdateSpecialty}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        );
      };
      
    return(
        <div className='BodySpecialty'>
             <div className="headerPage" >
                            <div style={{fontSize:"30px"}}><HiOutlineBars3></HiOutlineBars3></div>
                              <div className="group">
                                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                                <input placeholder="Tìm kiếm Bác Sĩ" type="search" className="input"/>
                                </div>
                                <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                                    <div  style={{fontSize:"30px",color:"#35B8FF",cursor:"pointer"}}>
                                        <FaRegBell></FaRegBell>
                                    </div>    
                                    <div style={{width:"40px",height:"40px",borderRadius:"50%",cursor:"pointer"}}>
                                        <img style={{width:"100%",height:"100%",borderRadius:"50%"}} src={doctorInfo.doctor.doctorImage}/>
                                    </div>
                                </div>
                        </div>
                        <div className="header">
                        <div className="buttons">
                            <button className="btn create" onClick={() => setShowModal(true)}>+ Tạo</button>
                            </div>
      </div>
                        <div className="table-container">
      <table className="appointment-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Id Chuyên Khoa</th>
            <th>Tên Chuyên Khoa</th>
            <th>Triệu Chứng</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listSpecialty?.map((item, index) => (
            <tr key={item.specialtyId}>
              <td>{index+1}</td>
              <td>{item.specialtyId}</td>
              <td>{item.specialtyName}</td>
              <td>{item.specialtyDescription}</td>
              <td>
              <button className="action-btn" onClick={() => {
                    setSelectedSpecialty(item);
                    setShowUpdateModal(true);
                  }}>✏️</button>
<button className="action-btn" onClick={() => {
                    setSelectedSpecialty(item);
                    setShowDeleteModal(true);
                  }}><RiDeleteBin6Line /></button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showModal && (
  <ModalTaoSpecialty
    onClose={() => setShowModal(false)}
    onCreate={handleCreateSpecialty}
  />
)}
   {showDeleteModal && selectedSpecialty && (
        <ModalDeleteSpecialty
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteSpecialty}
          specialty={selectedSpecialty}
        />
      )}
        {showUpdateModal && selectedSpecialty && (
        <ModalUpdateSpecialty
          onClose={() => setShowUpdateModal(false)}
          // onUpdate={handleUpdateSpecialty}
          specialty={selectedSpecialty}
        />
      )}
        </div>
    )
}
export default SpecialtyPage