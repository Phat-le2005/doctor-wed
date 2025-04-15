import { Routes, Route } from "react-router-dom";
import { DoctorProvider } from './components/Appoinment/doctorContext';
import Register from "./components/Auth/AuthPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "../src/views/Admin";
import DashBoard from "./components/Admin/DashBoard";
import User from "./components/Admin/User";
import HomePage from "./components/HomePage/HomePage";
import ViewApp from "../src/views/viewApp";
import DoctorService from "./components/DoctorService/DoctorService";
import Specialty from "./components/Specialty/Specialty";
import DoctorInfor from "./components/DoctorService/DoctorInfor";
import Department from "./components/Department/Department";
import Select_pathology from "./components/Appoinment/Select_pathology";
import Select_doctor from "./components/Appoinment/Select_doctor";
import AppointmentView from "../src/views/AppointmentView"
import SelectTime from "../src/components/Appoinment/Select_time"
import Select_day from "../src/components/Appoinment/Select_day"
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      404 - Không tìm thấy trang yêu cầu.
    </div>
  );
};

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ViewApp />}>
          <Route index element={<HomePage />} />
          <Route path="homepage" element={<HomePage></HomePage>} />
          <Route path="doctor_service" element={<DoctorService></DoctorService>} />
          <Route path="doctor_infor/:id" element={<DoctorInfor></DoctorInfor>}></Route>
          <Route path="department" element={<Specialty></Specialty>}></Route>
          <Route path="specialty/:id" element={<Department/>}></Route>
        </Route>
        <Route path="/appointment" element={
        <DoctorProvider>
          <AppointmentView />
        </DoctorProvider>
      }>
        <Route path="select_pathology/:id" index element={<Select_pathology />} />
        <Route path="select_doctor" element={<Select_doctor />} />
        <Route path="select_day/:id" element={<Select_day />} />
        <Route path="select_time/:id" element={<SelectTime />} />
      </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard></DashBoard>} />{" "}
          {/* Định nghĩa index khi vào /admin */}
          <Route path="dashboard" element={<DashBoard></DashBoard>} />{" "}
          {/* Định nghĩa đường dẫn con */}
          <Route path="user" element={<User></User>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Layout;
