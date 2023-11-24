import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../shared/Navbar/Navbar";
import Cards from "../components/cards/Cards";
import "./MainContent.css";
// import Modal from "../../shared/Modals/Modal";
import ErrorModal from "../../shared/Modals/ErrorModal";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner";
import CreateClassModal from "../components/createJoinClass/CreateClassModal";

interface Props {
  id: any;
}

const MainContent = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedClass, setLoadedClass] = useState([]);

  const handleClick = () => {
    setMenuVisibility(!menuVisibility);
  };
  const userId = useParams().uid;
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/classes");

        const responseData = await response.json();
        // console.log(responseData.classes.title);
        setLoadedClass(responseData.classes);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  const loadedClasses = loadedClass.filter(
    (card: any) => card.creator || card.member === userId
  );

  return (
    <div>
      <Navbar logo="Logo" handleClick={handleClick} text="Add Classes" />
      <div className="container">
        {menuVisibility && (
          <CreateClassModal
            onClear={() => {
              setMenuVisibility(!menuVisibility);
            }}
            visible={menuVisibility}
          />
        )}
        <div className="classes__cards">
          {loadedClasses.map((card: any) => (
            <Cards
              key={card.title}
              name={card.title}
              description={
                card.description.length > 30
                  ? card.description.slice(0, 30) + "..."
                  : card.description
              }
              classCode={card.classCode}
              id={card._id}
              creator={card.creator}
            />
          ))}
        </div>
        {/* {loadedClass} */}
      </div>
    </div>
  );
};

export default MainContent;
