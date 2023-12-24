import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../shared/Navbar/Navbar";
import Button from "../../shared/button/Button";
import Cards from "../components/cards/Cards";
import ErrorModal from "../../shared/Modals/ErrorModal";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner";
import CreateClassModal from "../components/classModal/ClassModal";
import { AuthContext } from "../../shared/context/auth-context";

import logo from "../../landingPage/assets/logo/svg/logo-no-background.svg";
import "./MainContent.css";

const MainContent = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined || null || String);
  const [loadedClass, setLoadedClass] = useState([]);
  const auth = useContext(AuthContext);

  const handleClick = () => {
    setMenuVisibility(!menuVisibility);
  };
  const userId = useParams().uid;
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/classes`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const responseData = await response.json();
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
    setError("");
  };
  const loadedClasses = loadedClass.filter(
    (card: any) => card.members.includes(userId) || card.creator === userId
  );

  return (
    <div>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Navbar
        logo={<img src={logo} alt="" className="navbar-logo" />}
        handleClick={handleClick}
        text="Add Classes"
      />
      <div className="container">
        {menuVisibility && (
          <CreateClassModal
            onClear={() => {
              setMenuVisibility(!menuVisibility);
            }}
            visible={menuVisibility}
          />
        )}
        {loadedClasses.length === 0 ? (
          <div className="center">
            <h2>No classes yet</h2>
            <Button onClick={handleClick}>Make a class</Button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default MainContent;
