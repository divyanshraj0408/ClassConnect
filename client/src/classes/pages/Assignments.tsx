import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import "./Assignments.css";

const Assignments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [assignments, setAssignments] = useState([]);

  const classId = useParams().cid;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/assignments");

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
  return (
    <div>
      <div className="assignments contianer">
        <Navbar
          logo="Assignments"
          handleClick={() => {}}
          text="Add Assignments"
        />
        <div className="assignments-container">
          {requiredAssignment.map((assignment: any) => (
            // <h2>{assignment.title}</h2>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
