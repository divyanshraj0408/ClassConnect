import interactiveLogo from ".././assets/interactive.svg";
import personalizedLogo from ".././assets/personalized.svg";
import realTimeLogo from "../assets/realTime.svg";
import "./info.css";
const InfoSection = () => {
  return (
    <>
      <div className="container logos">
        <div className="logoSection">
          <img src={interactiveLogo} alt="" />
          <p>interactive</p>
        </div>
        <div className="logoSection">
          <img src={personalizedLogo} alt="" />
          <p>Peronalized</p>
        </div>
        <div className="logoSection">
          <img src={realTimeLogo} alt="" />
          <p>Real Time</p>
        </div>
      </div>
    </>
  );
};
export default InfoSection;
