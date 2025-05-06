import "./TKPage.scss"
import { useSelector } from "react-redux";
const TKPage = () =>{
    const { doctorInfo, isError } = useSelector((state) => state.doctorInfo);
    const monthlyAppointments = 1231;
  const todayAppointments = 30;
  const pendingAppointments = 40;
  const approvedAppointments = 311;

  const topDoctors = [
    { id: "12345678", name: "Danny Dang", department: "Tiêu hóa", total: 120 },
    { id: "83874747", name: "Nguyễn Văn An", department: "Tiêu hóa", total: 87 },
    { id: "21412421", name: "Trần Thị Bích Ngọc", department: "Tiêu hóa", total: 64 },
    { id: "56644553", name: "Lê Văn Minh", department: "Tiêu hóa", total: 55 },
    { id: "97764436", name: "Phạm Thị Thu Hằng", department: "Tiêu hóa", total: 43 }
  ];

  const topDepartments = [
    { id: "12345678", name: "Tiêu hóa", total: 300 },
    { id: "83874747", name: "Nội tiết", total: 240 },
    { id: "21412421", name: "Tiết niệu", total: 230 },
    { id: "56644553", name: "Thần kinh", total: 140 },
    { id: "97764436", name: "Hô hấp", total: 100 }
  ];
    return(
        <div className="BodyTK">
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
      <div className="dashboard">
      <h2>TRANG THỐNG KÊ</h2>
      <p>Chào mừng bạn đến với trang thống kê</p>

      <div className="summary">
        <div className="card" style={{color:"#fff"}}>Tổng lịch khám tháng <span>{monthlyAppointments}</span></div>
        <div className="card" style={{color:"#fff"}}>Lịch Khám hôm nay <span>{todayAppointments}</span></div>
        <div className="card" style={{color:"#fff"}}>Lịch khám đang chờ <span>{pendingAppointments}</span></div>
        <div className="card" style={{color:"#fff"}}>Lịch khám đã duyệt <span>{approvedAppointments}</span></div>
      </div>

      <div className="filters">
        <select><option>Bảng</option></select>
        <select><option>Năm</option></select>
      </div>

      <div className="tables">
        <div className="table-box">
          <h3>Top 5 bác sĩ có lượt đăng ký cao nhất</h3>
          <table>
            <thead>
              <tr>
                <th>ID Admin</th>
                <th>Tên Admin</th>
                <th>Khoa</th>
                <th>Lượt đăng ký</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {topDoctors.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.department}</td>
                  <td >{doctor.total}</td>
                  <td>👁</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-box">
          <h3>Top 5 Khoa có lượt đăng ký nhiều nhất</h3>
          <table>
            <thead>
              <tr>
                <th>ID khoa</th>
                <th>Tên Khoa</th>
                <th>Lượt đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {topDepartments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.id}</td>
                  <td>{dept.name}</td>
                  <td>{dept.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
    )
}
export default TKPage