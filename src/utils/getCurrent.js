// src/utils/getCurrent.js
export const getCurrent = () => {
    try {
      const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
      if (!persistRoot) return null;
  
      const userLogin = JSON.parse(persistRoot.userLogin);
      const doctorInfo = JSON.parse(persistRoot.doctorInfo);
  
      if (userLogin?.userLogin) {
        return { ...userLogin.userLogin, type: "user" };
      }
  
      if (doctorInfo?.doctorInfo?.doctor) {
        return { ...doctorInfo.doctorInfo.doctor, type: "doctor", role: doctorInfo.doctorInfo.doctor.role };
      }
  
      return null;
    } catch (e) {
      console.error("getCurrent error:", e);
      return null;
    }
  };
  