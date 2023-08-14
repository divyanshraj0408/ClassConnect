import { Link } from "react-router-dom";

import "./cards.css";
interface Props {
  name: string;
  description: string;
  classCode: string;
  creator: string;
  id: string;
}
const Cards = (props: Props) => {
  return (
    <>
      <Link to={`/${props.id}/assigments`} className="cards__component">
        <div className="cards__component_info">
          <p>{props.name}</p>
          <p>{props.classCode}</p>
          <p>{props.description}</p>
          <p>{props.creator}</p>
        </div>
      </Link>
    </>
  );
};

export default Cards;
