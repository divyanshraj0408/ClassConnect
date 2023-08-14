import "./Assignments.css";

const Assignments = () => {
  const ASSIGNMENTS = [
    {
      id: 1,
      title: "Assignment 1",
      description: "This is the first assignment",
      dueDate: "2021-10-10",
      points: 100,
      status: "Not Submitted",
    },
    {
      id: 1,
      title: "Assignment 1",
      description: "This is the first assignment",
      dueDate: "2021-10-10",
      points: 100,
      status: "Not Submitted",
    },
    {
      id: 1,
      title: "Assignment 1",
      description: "This is the first assignment",
      dueDate: "2021-10-10",
      points: 100,
      status: "Not Submitted",
    },
  ];

  return (
    <div>
      <div className="assignments contianer">
        <h1>Assignments</h1>
        <div className="assignments-container">
          {ASSIGNMENTS.map((assignment) => (
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
