// DoctorContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { getDataDoctor } from '../../service/doctorService'; // chỉnh path nếu cần
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const { id: doctorId } = useParams();
  const [dataDoctor, setDataDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
    const [specialty,setSpecialty] =useState({})
  const fetchDoctor = async () => {
    try {
      const res = await getDataDoctor(doctorId);
      console.log("Dữ liệu bác sĩ từ context:", res);
      if (res.errCode !== 0 || !res.data || res.data.length === 0) {
        toast.error("Không tìm thấy thông tin bác sĩ");
        return;
      }
      setDataDoctor(res.data[0]);
    } catch (err) {
      toast.error("Lỗi khi tải thông tin bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) fetchDoctor();
  }, [doctorId]);

  return (
    <DoctorContext.Provider value={{ dataDoctor, loading ,specialty,setSpecialty}}>
      {children}
    </DoctorContext.Provider>
  );
};
