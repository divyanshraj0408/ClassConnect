import { useParams } from "react-router-dom";

import Input from "../../shared/Input/Input";

import { VALIDATOR_REQUIRE } from "../../shared/util/Validator";
import "./Assignments.css";

const Assignments = () => {
  const ASSIGNMENTS = [
    {
      id: 1,
      classId: "c1",
      title: "Announcement",
      description:
        "As you would be aware, the National Institute of Electronics and Information Technology (NIELIT) is an autonomous scientific society of the Ministry of Electronics & Information Technology (MeitY), Government of India, and has its presence at 47 locations across India, which offers Degree/Diploma and Skill Oriented courses in the area of Information, Electronics and Communication Technology (IECT). ",
      dueDate: "2021-10-10",
      points: 100,
      status: "Not Submitted",
    },
    {
      id: 1,
      classId: "c1",
      title: "Assignment 1",
      description: "This is the first assignment",
      dueDate: "2021-10-10",
      points: 100,
      status: "Not Submitted",
    },
    {
      id: 1,
      classId: "c2",
      title: "Assignment 1",
      description: "This is the first assignment",
      dueDate: "2021-10-10",
      points: 100,
      status: "Not Submitted",
    },
  ];

  const classId = useParams().cid;
  const loadedAssignments = ASSIGNMENTS.filter(
    (assignment) => assignment.classId === classId
  );
  return (
    <div>
      <div>
        <Input
          element="input"
          id="assignment"
          label="Assignment"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid assignment"
          onInput={() => {}}
        ></Input>
      </div>
      <div className="assignments contianer">
        <h1>Assignments</h1>
        <div className="assignments-container">
          {loadedAssignments.map((assignment) => (
            <div className="assignment-card" key={assignment.id}>
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
