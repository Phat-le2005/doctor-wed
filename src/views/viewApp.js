import { BrowserRouter } from 'react-router-dom';


import HomePage from '../components/HomePage/HomePage';
// import { increaseCounter,decreaseCounter } from './redux/action/counterAction';

// import { useSelector,useDispatch } from 'react-redux';
const viewApp=(props)=> {
 
  return (
    <>
      {/* <Header></Header>
        <Banner></Banner> */}
        <HomePage></HomePage>
    </>
  );
}
export default viewApp;