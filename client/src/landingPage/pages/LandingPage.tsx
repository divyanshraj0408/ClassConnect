import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import image from "../assets/Group 2.svg";
import "./LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };
  // const imageStyle = {
  //   filter: "drop-shadow(16px 16px 20px blue)",
  //   maxWidth: "100%",
  //   float: "right",
  // };
  return (
    <div>
      <Navbar logo="Logo" handleClick={handleClick} text="Login/Signup" />
      <div className="landing-page container">
        <div className="landing-page__content">
          <div className="landing-page__header-image">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
