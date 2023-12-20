import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../shared/Navbar/Navbar";
import AssignmentModal from "../components/assignmentsModal/AssignmentModal";
import Button from "../../shared/button/Button";
import "./Assignments.css";

const Assignments = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [className, setClassName] = useState("");

  const classId = useParams().cid;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/assignments`
        );
        const responseData = await response.json();
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
  return (
    <div>
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
