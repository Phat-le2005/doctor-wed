import ModalCreateUsers from "./modalCreateUsers";
import { Card } from "@mui/material";
import './manageUser.scss';
import { useDispatch } from "react-redux";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getAllUserPaginate } from "../../redux/action/userAction";
// import ModalViewUsers from "./modalViewUser";
import ModalDeleteUser from "./modalDeleteUser";
import TableUserPaginate from "./tableUserPaginate";
const ManageUsers = (props)=> {
    const LIMIT_USER = 5;
    const[showModalCreatUser,setshowModalCreatUser] = useState(false);
    const[showModalUpdateUser,setshowModalUpdateUser] = useState(false);
    const[showModalDeleteUser,setshowModalDeleteUser] = useState(false);
    const[showModalViewUser,setshowModalViewUser] = useState(false);
    const[DataUpdate,setDataUpdate] = useState({})
    const[DataDelete,setDataDelete] = useState({})
    const [ListUser,setListUser] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [currentpage,setcurrentpage] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        FetchListUserWithPaginate(currentpage);
    }, []);
    const FetchListUserWithPaginate = async (page) => {
        let res = await dispatch(getAllUserPaginate(page,LIMIT_USER));
        if (res.errCode === 0){
            console.log('Dt: ',res.data)
            setListUser(res.data);
            setPageCount(res.totalPages)
        }
    }
    const HandClickbtnUpdate=(user)=>{
        setshowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const resetUpdateUser=()=>{
        setDataUpdate({})
    }
    const HandClickbtnDelete = (user) => {
        setshowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-content">
            
            <div className="title" style={{color:"gray"}}>
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-light" style={{ letterSpacing:"normal"}} onClick={()=>setshowModalCreatUser(true)}> <FcPlus/> Add New </button>
                </div>
                <div className="table-user-container">
                    <TableUserPaginate ListUser={ListUser}
                    FetchListUserWithPaginate = {FetchListUserWithPaginate}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                    HandClickbtnUpdate={HandClickbtnUpdate}
                    // HandClickbtnView={HandClickbtnView}
                    HandClickbtnDelete={HandClickbtnDelete}
                    pageCount={pageCount}
                    />
                    
                </div>
                <ModalCreateUsers show={showModalCreatUser} setShow={setshowModalCreatUser} 
                FetchListUserWithPaginate = {FetchListUserWithPaginate}
                currentpage={currentpage}
                setcurrentpage={setcurrentpage}/>
                {/* <ModalUpdateUsers
                    show={showModalUpdateUser}
                    setShow={setshowModalUpdateUser}
                    DataUpdate={DataUpdate}
                    resetUpdateUser={resetUpdateUser}
                    FetchListUserWithPaginate = {FetchListUserWithPaginate}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                /> */}
               <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setshowModalDeleteUser}
                DataDelete={DataDelete}
                FetchListUserWithPaginate={FetchListUserWithPaginate}
                currentpage={currentpage}
                setcurrentpage={setcurrentpage}
                ListUser={ListUser} // 👈 THÊM nếu ModalDeleteUser cần
                />
                  {/* <ModalViewUsers 
                    show={showModalViewUser}
                    setShow={setshowModalViewUser}
                    FetchListUserWithPaginate={FetchListUserWithPaginate}
                    DataUpdate={DataUpdate}
                    resetUpdateUser={resetUpdateUser}
                /> */}
            </div>
        </div>
    )
}
export default ManageUsers;