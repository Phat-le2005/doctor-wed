import './Select_pathology.scss'
import footer from '../../assets/image/Footer.png'
import iconArrow from '../../assets/icon/Polygon2.png'
import Hospital from '../../assets/icon/iconHospital.png'
import Ck from '../../assets/icon/iconCk.png'
import Doctor from '../../assets/icon/iconDoctor.png'
import {get_schedule} from"../../service/scheduleService"
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  parseISO,startOfDay
} from "date-fns";
import { useDoctor } from './doctorContext'
import "./select_day.scss"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import phongkham from "../../assets/icon/phongKham.png"
const Select_day = () =>{
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Tháng 3/2025
    const [selectedDate, setSelectedDate] = useState(null);
    const [allowedWeekdays,setallowedWeekdays]= useState([])
    const { dataDoctor, specialty, setDataSchedule, dataSchedule ,loading,setLoading ,setDay} = useDoctor();
    // const { id: doctorId } = useParams();
    const navigate = useNavigate()
   const handleChooseDay =(data)=>{
    setDay(data)
    setTimeout(() => {
      navigate(`/appointment/select_time`);
    }, 0);
   }
        useEffect(() => {
          const fetchSchedule = async () => {
            if (dataDoctor?.doctorId && specialty?.specialtyId) {
              setLoading(true); // 👈 báo đang loading
              try {
                const res = await get_schedule(dataDoctor.doctorId, specialty.specialtyId);
                if (res.errCode === 0 && res.schedules) {
                  setDataSchedule(res);
                 
                  
                } else {
                  toast.error("Không tìm thấy lịch khám");
                }
              } catch {
                toast.error("Lỗi khi tải lịch khám");
              } finally {
                setLoading(false); // 👈 ngưng loading
              }
            }
          };
          fetchSchedule();
        }, [dataDoctor, specialty]);
        useEffect(() => {
          if (dataSchedule && Array.isArray(dataSchedule.schedules) && dataSchedule.schedules.length > 0) {
            // Giả sử bạn lấy workDay từ lịch đầu tiên
            const firstSchedule = dataSchedule.schedules[0];
            if (firstSchedule.workDay) {
              const str = firstSchedule.workDay;
              const weekdays = str.split(',').map(num => parseInt(num) - 1); // Chuyển về dạng 0-6
              setallowedWeekdays(weekdays);
            }
          }
        }, [dataSchedule]);
      if (loading || !dataDoctor || !specialty) {
        return <div>Loading...</div>;
      }
      console.log(dataSchedule)
    const styles = {
        header: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          padding: "10px 0",
          fontSize: "18px",
          color: "#00aaff",
        },
        row: {
          display: "flex",
          justifyContent: "space-between",
        },
        cell: {
          width: "100px",
          height: "55px",
          textAlign: "center",
          lineHeight: "40px",
          margin: 2,
          border: "1px solid gray",
          boxSizing: "border-box",
        },
      };
      
      const renderHeader = () => {
        const today = new Date();
        const isPrevDisabled =
          currentMonth.getFullYear() === today.getFullYear() &&
          currentMonth.getMonth() <= today.getMonth(); // 👈 nếu đang ở tháng hiện tại hoặc nhỏ hơn 
        return (
          <div style={styles.header}>
            <button
              className='buttonClick'
              onClick={() => {
                if (!isPrevDisabled) {
                  setCurrentMonth(subMonths(currentMonth, 1));
                }
              }}
              disabled={isPrevDisabled}
              style={{
                cursor: isPrevDisabled ? "not-allowed" : "pointer",
                opacity: isPrevDisabled ? 0.4 : 1,
              }}
            >
              ←
            </button>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
                position:"relative",
                // bottom: "15px"

              }}
            >
              Tháng {format(currentMonth, "MM")} - {format(currentMonth, "yyyy")}
            </span>
            <button
              className='buttonClick'
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              →
            </button>
          </div>
        );
      };
  
    const renderDays = () => {
      const days = ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];
      return (
        <div style={styles.row}>
          {days.map((day, i) => (
            <div key={i} style={{ ...styles.cell, fontWeight: "bold", background: "#eee" }}>
              {day}
            </div>
          ))}
        </div>
      );
    };
    const renderCells = () => {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
      const today = new Date();
    
      const rows = [];
      let days = [];
      let day = startDate;
    
      while (day <= monthEnd || days.length % 7 !== 0) {
        for (let i = 0; i < 7; i++) {
          const cloneDay = day;
          const isAllowed = allowedWeekdays.includes(getDay(day));
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isPastDay = day < startOfDay(today); // 👈 Check ngày đã qua
    
          days.push(
            <div
              key={day}
              style={{
                ...styles.cell,
                color: isCurrentMonth ? "#000" : "#ccc",
                background: isSelected ? "#4dc4ff" : "#fff",
                fontWeight: isAllowed && !isPastDay ? "bold" : "normal",
                cursor: isAllowed && !isPastDay ? "pointer" : "not-allowed",
                opacity: isAllowed && !isPastDay ? 1 : 0.3,
                borderRadius: 4,
              }}
              onClick={() => {
                if (isAllowed && !isPastDay) {
                  setSelectedDate(cloneDay);
                  handleChooseDay(cloneDay);
                }
              }}
            >
              {format(day, "d")}
            </div>
          );
    
          day = addDays(day, 1);
        }
    
        rows.push(
          <div key={day} style={styles.row}>
            {days}
          </div>
        );
        days = [];
      }
    
      return <div>{rows}</div>;
    };
    
    
    if (!dataSchedule || !dataSchedule.schedules) {
      return <div>Đang tải dữ liệu lịch khám...</div>;
    }
    return(
        <div className='Sp-bodyy'>
            <div className='Container'>
                <div className="Text">
                    <span>Trang Chu</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span >Chọn Bác Sĩ</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span >Chọn Bệnh Lý</span>
                    <img src={iconArrow} style={{width:"10px",height:"10px"}}></img>
                    <span style={{color:"#35B8FF"}}>Chọn Ngày Khám</span>
                </div>  
                <div className='Content'>
                    <div className='Infor'>
                        <div className='TInfor'>
                            <span>
                                Thông Tin Y Tế Cơ Sở
                            </span>
                        </div>
                        <div className='KInfor'>
                            <div className='item'>
                                <img src={Hospital}></img>
                                <span>Bệnh viện Đại học Y Dược TP.HCM</span>
                            </div>
                            <div className='item'>
                            <span >Cơ sở 215 Hồng Bàng, Phường 11, Quận 5, TP.HCM</span>
                            </div>
                            <div className='item'>
                                <img src={Doctor}></img>
                                <span>{dataDoctor.position + " | "+ dataDoctor.doctorName} </span>
                            </div>
                            <div className='item'>
                                <img src={Ck}></img>
                                <span>Chuyên khoa : {specialty?.Department?.departmentName || specialty?.department?.departmentName }</span>
                            </div>
                             <div className='item'>
                              <img src={phongkham}></img>
                              <span>Phòng Khám: {dataSchedule.schedules[0].Room.toa+"."+dataSchedule.schedules[0].Room.floor+dataSchedule.schedules[0].Room.roomNumber }</span>
                            </div>
                        </div>

                    </div>
                    <div className='Action'>
                        <div className='TAction'>
                            <span>Vui Lòng Chọn Ngày Khám</span>
                        </div>
                        <div className='KAction'>
                            {renderHeader()}
                            {renderDays()}
                            {renderCells()}
                            </div>
                    </div>
                </div>
            </div> 
            <img src={footer} style={{width:"100%",height:"321px"}}></img>
        </div>
    )
}
export default Select_day