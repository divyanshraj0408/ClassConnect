import "./Link.css";
interface LinkProps {
  text: string;
  handleClick: () => void;
}
const Link = (props: LinkProps) => {
  return (
    <>
      <button className="Link" onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  );
};
export default Link;
