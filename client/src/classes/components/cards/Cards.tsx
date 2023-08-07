import "./cards.css";
interface Props {
  name: string;
}
const Cards = (props: Props) => {
  return (
    <>
      <div className="card">
        <p>{props.name}</p>
      </div>
    </>
  );
};

export default Cards;
