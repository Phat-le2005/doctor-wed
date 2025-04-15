// DoctorContext.js
import { createContext, useState, useContext} from 'react';
const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [dataDoctor, setDataDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSchedule, setDataSchedule] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [day,setDay] =useState(null)
  const [scheSelect,setScheSelect] = useState(null)
  const [scheduleId,setScheduleId] = useState(null)
  return (
    <DoctorContext.Provider
      value={{
        dataDoctor,
        setDataDoctor,
        loading,
        setLoading,
        specialty,
        setSpecialty,
        dataSchedule,
        setDataSchedule,
        setDay,
        day,
        scheSelect,
        setScheSelect,
        scheduleId,setScheduleId
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
