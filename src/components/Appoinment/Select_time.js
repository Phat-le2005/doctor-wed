
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
  getDay,
  parseISO,
} from "date-fns";
import lineTime from "../../assets/icon/lineTime.png"
import phongkham from "../../assets/icon/phongKham.png"
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useDoctor } from './doctorContext'
import "./Select_time.scss"
import { useParams } from 'react-router-dom'

dayjs.extend(isoWeek); // 👈 Thêm dòng này
const SelectTime = () =>{
    const ctx = useDoctor();
    console.log('DoctorContext:', ctx);
    const { dataDoctor, specialty, setDataSchedule, dataSchedule ,loading,setLoading ,setDay,day,setScheduleId} = useDoctor();
    const { id: doctorId } = useParams();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3));
    const chooseTime=(scheduleId)=>{
      setScheduleId(scheduleId)
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
      console.log(day)
      useEffect(() => {
        if (day) {
         
          setSelectedDate(dayjs(day));
        }
      }, [dataDoctor, specialty, day]);
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
                bottom: "15px"

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
      const Calendar = ({ selectedDate, setSelectedDate }) => {
        const startOfWeek = selectedDate.startOf('isoWeek');
        const weekDates = [...Array(7)].map((_, idx) => startOfWeek.add(idx, 'day'));
      
        const daysShort = [ "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy","CN"];
      
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                {daysShort.map((day, i) => (
                  <th
                    key={i}
                    style={{
                      padding: '8px 0',
                      background: '#ddd',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      border: '1px solid #ccc'
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekDates.map((date, i) => {
                  const isSelected = date.isSame(selectedDate, 'day');
                  return (
                    <td
                      key={i}
                      onClick={() => {
                        setSelectedDate(date);
                        setDay(date.toISOString()); // nếu bạn dùng context
                      }}
                      style={{
                        padding: '10px 0',
                        textAlign: 'center',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        background: isSelected ? '#00aaff' : '#fff',
                        color: isSelected ? '#fff' : '#000',
                        fontWeight: isSelected ? 'bold' : 'normal',
                        borderRadius: isSelected ? '6px' : '0'
                      }}
                    >
                      {date.format('DD')}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        );
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
                                            <span>Chuyên khoa : {specialty.Department.departmentName}</span>
                                        </div>
                                        <div className='item'>
                                            <img src={phongkham}></img>
                                            {dataSchedule?.schedules?.[0]?.Room ? (
                                                <span>
                                                    Phòng Khám: {
                                                    dataSchedule.schedules[0].Room.toa + "." +
                                                    dataSchedule.schedules[0].Room.floor + 
                                                    dataSchedule.schedules[0].Room.roomNumber
                                                    }
                                                </span>
                                                ) : (
                                                <span>Đang tải thông tin phòng khám...</span>
                                                )}
                                        </div>
                                    </div>
            
                                </div>
                                <div className='Action'>
                                    <div className='TAction'>
                                        <span>Vui Lòng Chọn Ngày Khám</span>
                                    </div>
                                    <div className='KAction'>
                                        {renderHeader()}
                                        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                        <div className='opAction'>
                                            <div>
                                                <img src={lineTime}></img>
                                                <span className='close' style={{marginLeft:"5px"}}>Đóng</span>
                                            </div>
                                            <div><span style={{fontSize:'18px',fontWeight:"500"}}>Buổi Sáng</span></div>
                                            <div className='SchAction'>
                                                {dataSchedule.schedules&& dataSchedule.schedules.length>0 && dataSchedule.schedules.map(
                                                    (item,index)=> <div onClick={chooseTime(item.scheduleId)} className='itemSchedule'>{item.startTime+" - "+item.endTime}</div>
                                                )}
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div> 
                        <img src={footer} style={{width:"100%",height:"321px"}}></img>
                    </div>
                )

}
export default SelectTime