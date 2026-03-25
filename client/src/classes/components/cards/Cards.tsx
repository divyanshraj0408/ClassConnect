import { Link } from "react-router-dom";
import "./cards.css";

interface CardProps {
  name: string;
  description: string;
  classCode: string;
  creator: string;
  id: string;
}

const Cards: React.FC<CardProps> = ({ name, description, classCode, id }) => {
  // derive a consistent accent colour from the class name
  const hue = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;

  return (
    <Link to={`/${id}/assignments`} className="card" aria-label={`Open ${name}`}>
      {/* coloured top bar */}
      <div className="card__bar" style={{ background: `hsl(${hue} 65% 55%)` }} />

      <div className="card__body">
        <div className="card__top">
          {/* avatar */}
          <span
            className="card__avatar"
            style={{ background: `hsl(${hue} 65% 55%)` }}
          >
            {name.charAt(0).toUpperCase()}
          </span>

          <div className="card__meta">
            <p className="card__name">{name}</p>
            <p className="card__code">{classCode}</p>
          </div>
        </div>

        <p className="card__desc">{description}</p>
      </div>

      <div className="card__footer">
        <span className="card__pill">Open class →</span>
      </div>
    </Link>
  );
};

export default Cards;