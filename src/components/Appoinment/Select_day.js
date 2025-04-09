import './Select_pathology.scss'
import footer from '../../assets/image/Footer.png'
import iconArrow from '../../assets/icon/Polygon2.png'
import Hospital from '../../assets/icon/iconHospital.png'
import Ck from '../../assets/icon/iconCk.png'
import Doctor from '../../assets/icon/iconDoctor.png'

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
  parseISO,
} from "date-fns";
import { useDoctor } from './doctorContext'
import "./select_day.scss"
const Select_day = () =>{
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3)); // Tháng 3/2025
    const [selectedDate, setSelectedDate] = useState(null);
    const allowedDates = [
        "2025-03-15",
        "2025-03-20",
        "2025-03-25",
      ];
      const { dataDoctor, loading,specialty } = useDoctor();
      if (loading) {
        return <div>Loading...</div>;
      }
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
      return (
        <div style={styles.header}>
          <button className='buttonClick' onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>←</button>
          <span style={{ fontWeight: "bold",fontSize:"16px",display:"flex",justifyContent:"center",alignItem:"center",height:"80%" }}>
            Tháng {format(currentMonth, "MM")} - {format(currentMonth, "yyyy")}
          </span>
          <button className='buttonClick' onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>→</button>
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
  
      const rows = [];
      let days = [];
      let day = startDate;
  
      while (day <= monthEnd || days.length % 7 !== 0) {
        for (let i = 0; i < 7; i++) {
          const cloneDay = day;
          const dateStr = format(day, "yyyy-MM-dd");
          const isAllowed = allowedDates.includes(dateStr);
  
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
  
          days.push(
            <div
              key={day}
              style={{
                ...styles.cell,
                color: isCurrentMonth ? "#000" : "#ccc",
                background: isSelected ? "#4dc4ff" : "#fff",
                fontWeight: isAllowed ? "bold" : "normal",
                cursor: isAllowed ? "pointer" : "default",
                opacity: isAllowed ? 1 : 0.3,
                borderRadius: 4,
              }}
              onClick={() => isAllowed && setSelectedDate(cloneDay)}
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
                                <span>Chuyên khoa : </span>
                            </div>
                        </div>

                    </div>
                    <div className='Action'>
                        <div className='TAction'>
                            <span>Vui Lòng Chọn Bệnh Lý</span>
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