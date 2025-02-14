import { BrowserRouter } from 'react-router-dom';
import Banner from '../components/HomePage/Banner';
import Header from "../components/Header/HeaderUser"
// import { increaseCounter,decreaseCounter } from './redux/action/counterAction';

// import { useSelector,useDispatch } from 'react-redux';
const viewApp=(props)=> {
 
  return (
    <>
      <Header></Header>
        <Banner></Banner>
    </>
  );
}
export default viewApp;