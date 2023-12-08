import { useNavigate } from "react-router-dom";

import Navbar from "../../shared/Navbar/Navbar";
import image from "../assets/landingPagePhoto.jpg";
import "./LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };
  return (
    <div>
      <Navbar logo="Logo" handleClick={handleClick} text="Login/Signup" />
      <div className="landing-page container">
        <div className="landing-page__content"></div>
      </div>
    </div>
  );
};

export default LandingPage;
