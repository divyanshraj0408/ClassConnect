import { useNavigate } from "react-router-dom";

import Navbar from "../../shared/Navbar/Navbar";
import "./LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <Navbar logo="Logo" handleClick={handleClick} text="Login/Signup" />
    </div>
  );
};

export default LandingPage;
