import "./HistoryPage.scss"
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { useState,useEffect } from "react";
import { useRef } from "react";
import { getPrescription,getPrescriptionHistory,DeletePrescription } from "../../../service/prescriptionService";
import { GetHistory } from "../../../service/historyService";
import { toast } from "react-toastify";
import { CreateHP,UpdateHistory } from "../../../service/historyService";
const HistoryPage = () =>{
    const { doctorInfo } = useSelector((state) => state.doctorInfo);
    const [histories, setHistories] = useState([]);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const res = await GetHistory(doctorInfo.doctor.doctorId, page, 10, 0);
          setHistories(res.data);
          setTotal(res.total);
        } catch (error) {
          alert(error.message || 'Lỗi khi tải lịch sử');
        }
      };
      fetchHistory();
    }, [doctorInfo, page,showModal]);
    console.log(total)
    const MedicalModal = ({ onClose }) => {
      const modalRef = useRef();
      const [doctorNotes, setDoctorNotes] = useState(selectedHistory.doctorNotes || "");
      const [diagnosis,setDiagnosis] = useState(selectedHistory.diagnosis || "")
      const [searchTerm, setSearchTerm] = useState("");
      const [suggestions, setSuggestions] = useState([]);
      const [prescriptionList, setPrescriptionList] = useState([]);
      useEffect(() => {
        const fetchPrescriptionHistory = async () => {
          try {
            const data = await getPrescriptionHistory(selectedHistory.historyId);
            setPrescriptionList(data);  // Gán vào list ban đầu
          } catch (err) {
            console.error("Lỗi khi lấy toa thuốc cũ:", err);
          }
        };
    
        fetchPrescriptionHistory();
      }, [selectedHistory.historyId]);
      const handleOverlayClick = (e) => {
        if (e.target === modalRef.current) {
          onClose();
        }
      };
      const handleSubmit = async () => {
        const confirmCheckbox = document.getElementById("confirm");
        if (!confirmCheckbox?.checked) {
          toast.error("Vui lòng xác nhận thông tin khám!");
          return;
        }
      
        try {
          await UpdateHistory(selectedHistory.historyId, diagnosis, doctorNotes);
          await DeletePrescription(selectedHistory.historyId)
          for (const drug of prescriptionList) {
            await CreateHP(selectedHistory.historyId, drug.prescriptionId); // Đảm bảo mỗi thuốc có `id`
          }
          setDiagnosis("")
          setDoctorNotes("")
          setPrescriptionList([])
          toast.success("Đã lưu thông tin khám và toa thuốc!");
          onClose(); // Đóng modal sau khi hoàn tất
        } catch (error) {
          toast.error("Đã có lỗi xảy ra khi lưu thông tin.");
        }
      };
      useEffect(() => {
        const fetchDrugs = async () => {
          if (!searchTerm.trim()) {
            setSuggestions([]);
            return;
          }
    
          try {
            const data = await getPrescription(searchTerm);;
            setSuggestions(data); // Mỗi item: { name, dosage }
          } catch (err) {
            console.error("Lỗi gọi API thuốc:", err);
          }
        };
    
        const timeout = setTimeout(fetchDrugs, 300);
        return () => clearTimeout(timeout);
      }, [searchTerm]);
    
      const handleAddDrug = (drug) => {
        setPrescriptionList([...prescriptionList, drug]);
        setSearchTerm("");
        setSuggestions([]);
      };
    
      const handleRemoveDrug = (index) => {
        setPrescriptionList(prescriptionList.filter((_, i) => i !== index));
      };
    
          
      return (
        <div className="modal-overlay"  ref={modalRef}
        onClick={handleOverlayClick}>
          <div className="modal-box">
            <h3><strong>Họ và tên:</strong> <span className="blue-text">{selectedHistory.Appointment?.HoSo?.Name}</span></h3>
            <p><strong>Id lịch khám:</strong> {selectedHistory.appointmentId}</p>
            <p><span role="img" aria-label="calendar">📅</span> Ngày khám: {selectedHistory.Appointment?.day} &nbsp;
               <span role="img" aria-label="clock">⏰</span> Giờ:  {selectedHistory.Appointment?.Schedule.startTime} - {selectedHistory.Appointment?.Schedule.endTime} &nbsp;
               <hr></hr>
               <span role="img" aria-label="location">🏥</span> Phòng:   {selectedHistory.Appointment?.Schedule?.Room?.toa}.
                      {selectedHistory.Appointment?.Schedule?.Room?.floor}
                      {selectedHistory.Appointment.Schedule.Room.roomNumber.length == 2 ? selectedHistory.Appointment.Schedule.Room.roomNumber: "0"+selectedHistory.Appointment.Schedule.Room.roomNumber}</p>
            <label>Chuẩn đoán</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
    
            <label>Tìm thuốc</label>
        <input
          type="text"
          placeholder="Nhập tên thuốc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
<ul className="suggestions-list">
  {Array.isArray(suggestions) &&
    suggestions.map((drug, idx) => {
      if (!drug?.medicineName) return null;

      const regex = new RegExp(`(${searchTerm})`, "gi");
      const highlightedName = drug.medicineName.replace(regex, "<mark>$1</mark>");

      return (
        <li key={idx} onClick={() => handleAddDrug(drug)}>
          <span
            dangerouslySetInnerHTML={{
              __html: `💊 ${highlightedName} – ${drug.dosage || ""}`,
            }}
          />
        </li>
      );
    })}
</ul>
        <label>Toa thuốc</label>
        <ul className="prescription-list">
          {prescriptionList?.map((drug, idx) => (
            <li key={idx}>
              {idx + 1}. {drug.medicineName	} – {drug.dosage}
              <button onClick={() => handleRemoveDrug(idx)} style={{ marginLeft: "10px" }}>❌</button>
            </li>
          ))}
        </ul>
    
            <label>Lời khuyên</label>
            <textarea
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Nhập ghi chú cho bác sĩ..."
              rows={5}
              className="doctor-notes-textarea"
            />
    
            <div className="checkbox-row" >
              <input type="checkbox" id="confirm" style={{width:"20px",height:"20px",marginTop:"12px"}} />
              <label htmlFor="confirm">Xác nhận thông tin khám</label>
            </div>
    
            <button className="save-btn" onClick={handleSubmit}>Lưu thông tin khám</button>
          </div>
        </div>
      );
    };
    return (
        <div className="BodyHistory">
          <div className="headerPage">
            <div style={{ fontSize: "30px" }}>
              <HiOutlineBars3 />
            </div>
            <div className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input placeholder="Tìm kiếm bệnh án" type="search" className="input" />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <div style={{ fontSize: "30px", color: "#35B8FF", cursor: "pointer" }}>
                <FaRegBell />
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}>
                <img
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  src={doctorInfo.doctor?.doctorImage}
                  alt="avatar"
                />
              </div>
            </div>
          </div>
    
          <div className="Action">
            <input type="date" />
          </div>
    
          <div className="table-container">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Mã Lịch Sử</th>
                  <th>Mã lịch khám</th>
                  <th>Họ & tên</th>
                  <th>Ngày khám</th>
                  <th>Khung giờ</th>
                  <th>Phòng khám</th>
                  <th>Bệnh chuẩn đoán</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((item, index) => (
                  <tr key={item.historyId}>
                    <td>{item.historyId}</td>
                    <td>{item.appointmentId}</td>
                    <td>{item.Appointment?.HoSo?.Name || "Không rõ"}</td>
                    <td>{item.Appointment?.day}</td>
                    <td>
                      {item.Appointment?.Schedule.startTime} - {item.Appointment?.Schedule.endTime}
                    </td>
                    <td>
                      {item.Appointment?.Schedule?.Room?.toa}.
                      {item.Appointment?.Schedule?.Room?.floor}
                      {item.Appointment.Schedule.Room.roomNumber.length == 2 ? item.Appointment.Schedule.Room.roomNumber: "0"+item.Appointment.Schedule.Room.roomNumber}
                    </td>
                    <td>{item.Appointment?.Schedule?.specialty?.specialtyName}</td>
                    <td>
                    <button className="action-btn"  onClick={() => {
                        setSelectedHistory(item);
                        setShowModal(true);
                      }}><FaRegEdit />
                      </button>
              </td>
                  </tr>
                ))}
              </tbody>
            </table>
    
            {total > 1 && (
  <div className="pagination">
  <button disabled={page === 1} onClick={() => setPage(page - 1)}>{"<"}</button>
  <span>{page}</span>
  <button onClick={() => setPage(page + 1)}>{">"}</button>
</div>
)}
          </div>
          {showModal && selectedHistory && (
  <MedicalModal onClose={() => setShowModal(false)} data={selectedHistory} />
)}
        </div>
      );
    };
    
export default HistoryPage