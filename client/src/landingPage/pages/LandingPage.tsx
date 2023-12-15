import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import image from "../assets/Group 2.svg";
import logo from "../assets/logo/svg/logo-no-background.svg";
import "./LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };
  return (
    <div>
      <Navbar
        logo={<img src={logo} alt="" className="navbar-logo" />}
        handleClick={handleClick}
        text="Get started"
      ></Navbar>
      <div className="landing-page container">
        <div className="landing-page__header">
          <div>
            <h1>Lorem ipsum</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
              recusandae unde nisi corrupti officiis quia, incidunt,
              perspiciatis iste tempora non autem. Cum, iste? Possimus
              accusantium, atque dolorum fugiat corporis praesentium?
            </p>
          </div>
          <div className="landing-page__header-image">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
