import ReactDOM from "react-dom";

import "./Backdrop.css";

interface props {
  onClick: any;
}
const Backdrop = (props: props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook") as Element
  );
};

export default Backdrop;
