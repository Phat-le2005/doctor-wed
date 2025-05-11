import banner from "../../assets/image/Hoso.png"
import iconArrow from '../../assets/icon/Polygon2.png';
import './Hoso.scss'
import { useState } from "react";
import { isValidEmail,isValidPhone,isValidID } from "../../utils/validateInput";
import Footer from "../../assets/image/Footer.png"
import Swal from "sweetalert2"; // thêm thông báo đẹp (nếu bạn thích)
import { createHosoAPI } from "../../service/hoSoService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Hoso = () =>{
    const userLogin = useSelector((state) => state.userLogin.userLogin);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        id: '',
        ngay:'',
        thang:'',
        nam:'',
        job:'',
        dantoc: '',
        tinh:'',
        quan:'',
        phuong:'',
        address:'',
        sex: '',
        userId:`${userLogin.id}`
        // thêm các field khác nếu cần
      });
    
      const [errors, setErrors] = useState({});
      const handleChange = (e) => {
        const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
        
      };
      const isValidDate = (year, month, day) => {
        const date = new Date(`${year}-${month}-${day}`);
        return (
          date.getFullYear() == year &&
          date.getMonth() + 1 == month &&
          date.getDate() == day
        );
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
      
        if (!formData.name.trim()) newErrors.name = 'Họ tên không được để trống.';
        if (!isValidPhone(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ.';
        if (!isValidEmail(formData.email)) newErrors.email = 'Email không hợp lệ.';
        if (!isValidID(formData.id)) newErrors.id = 'CCCD phải đủ 12 số.';
        if (!formData.ngay.trim()) newErrors.ngay = 'Ngày không được để trống.';
        if (!formData.thang.trim()) newErrors.thang = 'Tháng không được để trống.';
        if (!formData.nam.trim()) newErrors.nam = 'Năm không được để trống.';
        if (!formData.job.trim()) newErrors.job = 'Nghề nghiệp không được để trống.';
        if (!formData.dantoc.trim()) newErrors.dantoc = 'Dân tộc không được để trống.';
        if (!formData.tinh.trim()) newErrors.tinh = 'Tỉnh không được để trống.';
        if (!formData.quan.trim()) newErrors.quan = 'Quận không được để trống.';
        if (!formData.phuong.trim()) newErrors.phuong = 'Phường không được để trống.';
        if (!formData.address.trim()) newErrors.address = 'Đường không được để trống.';
        if (!isValidDate(formData.nam, formData.thang, formData.ngay)) {
          newErrors.day = 'Ngày sinh không hợp lệ.';
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        } else {
          setErrors({});
          try {
            const response = await createHosoAPI(formData);
            if (response.data.errCode === 0) {
              Swal.fire("Thành công", "Tạo hồ sơ thành công!", "success");
              navigate('/homepage')
              console.log("Form hợp lệ:", formData);
            } else {
              Swal.fire("Lỗi", response.data.errMessage, "error");
            }
          } catch (error) {
            Swal.fire("Lỗi", "Không thể kết nối server", "error");
            console.error(error);
          }
        }
      };
    return(
        <div className="bodyyyyyy">
            <div className="Banner">
                <img src={banner} alt="banner"></img>
                 <div className="Texttt">
                          <span className="TrangChu">Trang Chủ</span>
                          <img src={iconArrow} alt="Arrow" style={{ width: "10px", height: "10px" }}  />
                    <span style={{ color: "#35B8FF" }}>Khám Theo Chuyên Khoa</span>
                </div>
            </div>
            <div className="Content">
            <div className="user-form">
                <p className="note">Vui lòng nhập thông tin chính xác để được phục vụ tốt nhất.</p>
                <h2 className="required">(*) Thông tin bắt buộc</h2>

                <form className="form-container" onSubmit={handleSubmit}>
                    <fieldset>
                    <legend>Thông tin chung <div style={{height:"1px",backgroundColor:"black"}}></div></legend>
                    <br></br>
                    <div className="form-group">
                        <label>Họ và tên (Có dấu) *</label>
                        <input type="text" placeholder="Nhập họ và tên"   
                        name="name"
                        value={formData.name}
                        onChange={handleChange} />
                         {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group dob-group">
                        <label>Ngày Sinh (năm/tháng/ngày) *</label>
                        <div className="dob">
                        <input  type="text" placeholder="Năm"  name="nam"
                        value={formData.nam}
                        onChange={handleChange} />
                         {errors.nam && <span className="error">{errors.nam}</span>}
                        <input type="text" placeholder="Tháng"  name="thang"
                        value={formData.thang}
                        onChange={handleChange} />
                         {errors.thang && <span className="error">{errors.thang}</span>}
                        <input type="text" placeholder="Ngày"  name="ngay"
                        value={formData.ngay}
                        onChange={handleChange} />
                         {errors.ngay && <span className="error">{errors.ngay}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Số Điện Thoại *</label>
                        <input type="text" placeholder="Vui lòng nhập Số điện thoại.."    name="phone"
                            value={formData.phone}
                            onChange={handleChange} />
                                {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label>Giới tính *</label>
                        <select name="sex" value={formData.sex} onChange={handleChange}>
  <option value={true}>Nam</option>
  <option value={false}>Nữ</option>
</select>
                    </div>

                    <div className="form-group">
                        <label>Nghề Nghiệp</label>
                        <input type="text" placeholder="Nhập Nghề Nghiệp"  name="job"
                                value={formData.job}
                                onChange={handleChange} />
                                {errors.job && <span className="error">{errors.job}</span>}
                    </div>

                    <div className="form-group">
                        <label>Mã định danh/CCCD/Passport *</label>
                        <input type="text" placeholder="Nhập Số Căn Cước Cần Dân .."    name="id"
                        value={formData.id}
                        onChange={handleChange}/>
                         {errors.id && <span className="error">{errors.id}</span>}
                    </div>

                    <div className="form-group">
                        <label>Địa chỉ Email *</label>
                        <input type="email" placeholder="Nhập địa chỉ Email"  
                            name="email"
                            value={formData.email}
                            onChange={handleChange} />
                            {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Dân tộc</label>
                        <input type="text" placeholder="Dân Tộc"  name="dantoc"
                        value={formData.dantoc}
                        onChange={handleChange} />
                         {errors.dantoc && <span className="error">{errors.dantoc}</span>}
                       
                    </div>
                    </fieldset>

                    <fieldset>
                    <legend>Địa chỉ theo CCCD <div style={{height:"1px",backgroundColor:"black"}}></div></legend>
                    <br></br>
                    <div className="form-group">
                        <label>Tỉnh/Thành *</label>
                        <input type="text" placeholder="Tỉnh Thành"  name="tinh"
                        value={formData.tinh}
                        onChange={handleChange} />
                         {errors.tinh && <span className="error">{errors.tinh}</span>}
                    </div>

                    <div className="form-group">
                        <label>Quận/Huyện *</label>
                        <input type="text" placeholder="Quận Huyện"  name="quan"
                        value={formData.quan}
                        onChange={handleChange} />
                         {errors.quan && <span className="error">{errors.quan}</span>}
                    </div>

                    <div className="form-group">
                        <label>Phường/Xã *</label>
                        <input type="text" placeholder="Xã Phường"  name="phuong"
                        value={formData.phuong}
                        onChange={handleChange} />
                         {errors.phuong && <span className="error">{errors.phuong}</span>}
                    </div>

                    <div className="form-group">
                        <label>Số nhà /Tên đường /Ấp thôn xóm *</label>
                        <input type="text"  name="address"
                        value={formData.address}
                        onChange={handleChange} />
                         {errors.address && <span className="error">{errors.address}</span>}
                    </div>
                    </fieldset>

                    <div className="submit-group">
                    <button type="submit">Tạo hồ sơ</button>
                    </div>
                </form>
                </div>
                </div>
                <div className="Footerrr">
                    <img src={Footer}></img>
                </div>
        </div>
    )
}
export default Hoso