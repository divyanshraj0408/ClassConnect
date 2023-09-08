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
        <div className="landing-page__content">
          <div className="landing-page__header-text">
            <h1 className="landing-page__heading">
              Welcome to the Landing Page
            </h1>
            <p className="landing-page__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, voluptates, quia quos voluptate quod
              voluptatibus quas quidem quibusdam, voluptates, quia quos
              voluptate] quod voluptatibus quas quidem quibusdam. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Eligendi, aliquam
              veritatis consequuntur molestias nihil quos et eius nam molestiae
              laboriosam voluptatibus quo porro ea voluptatum, asperiores
              accusantium sit. Ducimus minus laudantium cumque facere aliquam?
              Illum vero cupiditate aliquid aperiam eveniet, maiores nemo
              doloremque expedita voluptatum blanditiis dolorem. Aut architecto
              voluptates cupiditate veritatis ex beatae voluptatem eligendi quia
              id. Impedit, laudantium? Similique, consequatur molestiae ipsam
              nostrum in quis natus laboriosam earum molestias maiores sed quod
              dolore voluptatum temporibus architecto saepe illum aperiam aut
              accusamus dolores dignissimos aliquid eum suscipit. Blanditiis
              similique aut ratione modi nobis fugiat earum autem ullam
              reprehenderit inventore.
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
