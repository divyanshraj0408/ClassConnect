import "./Card.css";
interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
const Card = (props: Props) => {
  return (
    <>
      <div className={`card ${props.className}`} style={props.style}>
        {props.children}
      </div>
    </>
  );
};
export default Card;
