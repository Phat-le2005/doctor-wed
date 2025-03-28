import ReactPaginate from "react-paginate";
import React, {
  useEffect,
  useState
} from "react";

const TableUserPaginate = (props) =>{
    const {ListUser,pageCount} = props;
    const handlePageClick = (event) => {
        props.setcurrentpage(+event.selected+1)
        props.FetchListUserWithPaginate(+event.selected+1)
        console.log(`User requested page number ${event.selected}`);
      };
    return (
        <>
        <table className="table table-hover table-bordered ">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">PhoneNummber</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {ListUser && ListUser.length>0 && ListUser.map((item,index)=>{
                    return(
                    <tr key={`table-user-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.firstName + item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phonenumber}</td>
                    <td>
                        <button style={ {letterSpacing: "normal"}} onClick={()=>props.HandClickbtnView(item)} className='btn btn-secondary'>View</button>
                        {/* <button style={ {letterSpacing: "normal"}} onClick={()=>props.HandClickbtnUpdate(item)} className='btn btn-warning mx-3'>Update</button> */}
                        <button style={ {letterSpacing: "normal"}}  onClick={()=>props.HandClickbtnDelete(item)} className='btn btn-danger'>Delete</button>
                    </td>
                    </tr>
                    )
                })}
                {ListUser && ListUser.length===0 && 
                <tr>
                    <td colSpan={'4'}>Not found data</td>
                </tr>}
            </tbody>
        </table>
        <div className="btn-Paginate" style={{display:"flex",justifyContent:"center"}}>
        <ReactPaginate
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={props.currentpage-1}
      />
      </div>
        </>
    )
}
export default TableUserPaginate;