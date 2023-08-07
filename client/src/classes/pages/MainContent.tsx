import { useState } from "react";

import Navbar from "../../shared/Navbar/Navbar";
import Menu from "../components/menu/Menu";
import "./MainContent.css";

const MainContent = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const handleClick = () => {
    setMenuVisibility(!menuVisibility);
  };
  return (
    <div>
      <Navbar logo="Logo" handleClick={handleClick} text="Add Classes" />

      <div className="container">
        {menuVisibility && <Menu handleClick={handleClick} />}
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
          adipisci dolorem molestiae quisquam eum nihil. Laboriosam consectetur
          praesentium accusantium temporibus porro, vero iusto quis? Doloremque
          fugit veritatis enim obcaecati eligendi.
        </p>
      </div>
    </div>
  );
};

export default MainContent;
