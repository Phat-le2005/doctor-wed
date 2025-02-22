
import homepage from "../../assets/video/video-homepage.mp4"
import "../HomePage/Banner.scss"
const Banner = ()=>{
    return(
        <div>
            
            <div className="Banner-Image">
              <video autoPlay muted loop>
                  <source
                      src={homepage}
                      type="video/mp4"
                  />
              </video>
            </div>
              {/* Dịch Vụ Y Tế */}
      <section className="services">
        <div className="containerr">
            <div className='title1'>What seems to be the problem today?</div>
            <div className='title2'>There’s nothing to worry about. You’re going to be just fine.</div>
        </div>
      </section>
      
        </div>
    )
}
export default Banner