
import { Outlet,Link } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Header from '../components/header/header'
import '../views/viewApp.scss'

// import { increaseCounter,decreaseCounter } from './redux/action/counterAction';

// import { useSelector,useDispatch } from 'react-redux';
const ViewApp=()=> {
 
  return (
    <div style={{width:"100%",height:"auto"}}>

      <Header></Header>
        <div className='App-main'style={{position:"relative",}}>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
        </div>
    
  );
}
export default ViewApp;