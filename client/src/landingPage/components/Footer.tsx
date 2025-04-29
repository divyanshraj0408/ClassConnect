import githubLogo from ".././assets/github-mark.svg";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container center">
          <div className="github-footer">
            <span>Star us on github</span>
            <a href="#">
              <img src={githubLogo} alt="" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
