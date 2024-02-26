import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Navbar from "../../shared/Navbar/Navbar";
import AssignmentModal from "../components/assignmentsModal/AssignmentModal";
import Button from "../../shared/button/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./Assignments.css";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner";
import ErrorModal from "../../shared/Modals/ErrorModal";

const Assignments = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [assignments, setAssignments] = useState([]);
  const auth = useContext(AuthContext);
  const classId = useParams().cid;
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/assignments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        setAssignments(responseData.assignments);
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

  const requiredAssignment = assignments.filter(
    (assignment: any) => assignment.classId === classId
  );

  const handleAssignments = () => {
    setMenuVisibility(!menuVisibility);
  };
  const errorHandler = () => {
    setError("");
  };
  return (
    <div>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="assignments contianer">
        <Navbar
          logo="Assignments"
          handleClick={handleAssignments}
          text="Add Assignments"
        />
        {menuVisibility && (
          <AssignmentModal
            onClear={() => {
              setMenuVisibility(!menuVisibility);
            }}
            visible={menuVisibility}
          />
        )}
        <div className="heroSection">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            inverse
          >
            {"< "}Back to classes
          </Button>
          <div>
            <h3>Class Code:</h3>
            <h3>
              <span className="classCode">{classId}</span>
            </h3>
          </div>
        </div>
        <div className="assignments-container">
          {requiredAssignment.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <h2>No assignments</h2>
              <Button onClick={handleAssignments}>Create one</Button>
            </div>
          ) : (
            requiredAssignment.map((assignment: any) => (
              <div className="assignment-card" key={assignment._id}>
                <div className="assignment-card-header">
                  <h2>{assignment.title}</h2>
                  <h3>{assignment.status}</h3>
                </div>
                <div className="assignment-card-body">
                  <p>{assignment.description}</p>
                </div>
                <div className="assignment-card-footer">
                  <p>Due: {assignment.dueDate}</p>
                  <p>Points: {assignment.points}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
