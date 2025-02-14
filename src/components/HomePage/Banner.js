import Bannner from "../../assets/image/banner.webp"
import "../HomePage/Banner.scss"
const Banner = ()=>{
    return(
        <div>
            
            <div className="Banner-Image">
                <img src={Bannner} title="Banner"/>
            </div>
        </div>
    )
}
export default Banner