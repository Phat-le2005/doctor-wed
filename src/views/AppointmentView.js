import { Outlet,Link } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Header from '../components/header/header'
import Footer from "../components/Footer/Footer";

// import { increaseCounter,decreaseCounter } from './redux/action/counterAction';

// import { useSelector,useDispatch } from 'react-redux';
const AppointmentView=()=> {
 
  return (
    <div style={{width:"100%",height:"auto"}}>

      <Header></Header>
        <div className='Appoinment-main'style={{position:"relative",bottom:"20px"}}>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
        </div>
    
  );
}
export default AppointmentView;