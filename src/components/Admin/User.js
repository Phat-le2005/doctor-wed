import ModalCreateUsers from "./modalCreateUsers";
import { Card } from "@mui/material";
import './manageUser.scss';
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
// import { getAllUser,getUserWithPaginate } from "../../../services/ApiService";
import ModalUpdateUsers from "./modalUpdateUser";
import ModalDeleteUser from "./modalDeleteUser";
import TableUserPaginate from "./tableUserPaginate";
const ManageUsers = (props)=> {
    const LIMIT_USER = 3;
    const[showModalCreatUser,setshowModalCreatUser] = useState(false);
    const[showModalUpdateUser,setshowModalUpdateUser] = useState(false);
    const[showModalViewUser,setshowModalViewUser] = useState(false);
    const[showModalDeleteUser,setshowModalDeleteUser] = useState(false);
    const[DataUpdate,setDataUpdate] = useState({})
    const[DataDelete,setDataDelete] = useState({})
    const [ListUser,setListUser] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [currentpage,setcurrentpage] = useState(1)
    // useEffect(
    //     ()=>{FetchListUser();
    // },[]);
    // useEffect(
    //     ()=>{FetchListUserWithPaginate(1);
    // },[]);
    // const FetchListUser = async () => {
    //     let res = await getAllUser();
    //     if (res.EC === 0){
    //         setListUser(res.DT);
    //     }
    // }
    // const FetchListUserWithPaginate = async (page) => {
    //     let res = await getUserWithPaginate(page,LIMIT_USER);
    //     if (res.EC === 0){
    //         console.log('Dt: ',res.DT)
    //         setListUser(res.DT.users);
    //         setPageCount(res.DT.totalPages)
    //     }
    // }
    const HandClickbtnUpdate=(user)=>{
        setshowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const resetUpdateUser=()=>{
        setDataUpdate({})
    }
    const HandClickbtnView = (user)=>{
        setshowModalViewUser(true);
        setDataUpdate(user);
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
                    {/* <TableUser ListUser={ListUser}
                    HandClickbtnUpdate={HandClickbtnUpdate}
                    HandClickbtnView={HandClickbtnView}
                    HandClickbtnDelete={HandClickbtnDelete}
                    /> */}
                    <TableUserPaginate ListUser={ListUser}
                    // FetchListUserWithPaginate = {FetchListUserWithPaginate}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                    HandClickbtnUpdate={HandClickbtnUpdate}
                    // HandClickbtnView={HandClickbtnView}
                    HandClickbtnDelete={HandClickbtnDelete}
                    pageCount={pageCount}
                    />
                    
                </div>
                <ModalCreateUsers show={showModalCreatUser} setShow={setshowModalCreatUser} 
                // FetchListUser={FetchListUser} 
                // FetchListUserWithPaginate = {FetchListUserWithPaginate}
                currentpage={currentpage}
                setcurrentpage={setcurrentpage}/>
                <ModalUpdateUsers
                    show={showModalUpdateUser}
                    setShow={setshowModalUpdateUser}
                    DataUpdate={DataUpdate}
                    // FetchListUser={FetchListUser}
                    resetUpdateUser={resetUpdateUser}
                    // FetchListUserWithPaginate = {FetchListUserWithPaginate}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                />
                {/* <ModalViewUsers 
                    show={showModalViewUser}
                    setShow={setshowModalViewUser}
                    FetchListUser={FetchListUser}
                    DataUpdate={DataUpdate}
                    resetUpdateUser={resetUpdateUser}
                /> */}
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setshowModalDeleteUser}
                    DataDelete = {DataDelete}
                    // FetchListUser={FetchListUser}
                    // FetchListUserWithPaginate = {FetchListUserWithPaginate}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                />
            </div>
        </div>
    )
}
export default ManageUsers;