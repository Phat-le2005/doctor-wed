import { Routes, Route } from "react-router-dom";

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
          <Route path="doctor_infor" element={<DoctorInfor></DoctorInfor>}></Route>
          <Route path="specialty" element={<Specialty></Specialty>}></Route>
          <Route path="department" element={<Department/>}></Route>
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
