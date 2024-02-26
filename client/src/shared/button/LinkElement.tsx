import "./Link.css";
interface LinkProps {
  text: string;
  handleClick: () => void;
}
const LinkElement = (props: LinkProps) => {
  return (
    <>
      <button className="Link" onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  );
};
export default LinkElement;
