import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import image from "../assets/Group 2.svg";
import logo from "../assets/logo/svg/logo-no-background.svg";
import Button from "../../shared/button/Button";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
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
      <div className="landing-page">
        <div className="landing-page__header">
          <div className="container landing-page__header">
            <div>
              <h1>Class Connect</h1>
              <p>
                ClassConnect is a web application that aims to provide a
                platform similar to Google Classroom, allowing teachers to
                create classes, manage assignments, and interact with students
                in a virtual classroom environment.
              </p>
              <Button onClick={handleClick}>Get started</Button>
            </div>
            <div className="landing-page__header-image">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
      <InfoSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
