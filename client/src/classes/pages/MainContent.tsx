import { useState } from "react";

import Navbar from "../../shared/Navbar/Navbar";
import Menu from "../components/menu/Menu";
import Cards from "../components/cards/Cards";
import "./MainContent.css";

const MainContent = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const handleClick = () => {
    setMenuVisibility(!menuVisibility);
  };
  const CARDS = [
    {
      name: "LIC",
      discription: "A course about integrated circuits",
      creator: "u1",
      classCode: "ec-321",
      id: "c1",
    },
    {
      name: "LIC",
      discription: "A course about integrated circuits",
      creator: "u1",
      classCode: "ec-321",
      id: "c1",
    },
  ];
  return (
    <div>
      <Navbar logo="Logo" handleClick={handleClick} text="Add Classes" />

      <div className="container">
        {menuVisibility && <Menu handleClick={handleClick} />}
        <div className="classes__cards">
          {CARDS.map((card) => (
            <Cards
              key={card.name}
              name={card.name}
              description={
                card.discription.length > 20
                  ? card.discription.slice(0, 20) + "..."
                  : card.discription
              }
              creator={card.creator}
              classCode={card.classCode}
              id={card.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
