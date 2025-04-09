import "./DepartmentCard.scss"
const DepartmentCard = ({data,Ck}) =>{
    return (
        <div className='Cardd'>
        <div className='Hinhanh'>
            <img src={`http://localhost:8082${data.specialtyImage}`} alt={data.specialtyName} ></img>
        </div>
        <div className='infor'>
            <div className='Name'>{data.specialtyName}</div>
            <div className='chuyenKhoa'><span>Khoa Khám: </span>{Ck}</div>
            <div className='chuyenTri'><span>Triệu chứng: </span>{data.specialtyDescription}</div>
        </div>
        <div className='buttonnn'>
            Dang Ky Ngay
        </div>
    </div>
      );
}
export default DepartmentCard