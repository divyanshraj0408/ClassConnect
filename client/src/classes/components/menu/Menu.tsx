import { useState } from "react";

import Form from "../../../shared/Form/Form";
import Link from "../../../shared/button/Link";
import "./Menu.css";
interface Props {
  handleClick: () => void;
}
const Menu = (props: Props) => {
  const [showModal, setShowModal] = useState(false);

  const showCreateClassModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="menu-wrapper" onClick={props.handleClick}></div>
      <menu className="menu">
        <Link text="Join class" handleClick={showCreateClassModal} />
        <Link text="Create one" handleClick={showCreateClassModal} />
      </menu>
      {showModal && <Form handleClick={showCreateClassModal} />}
    </>
  );
};

export default Menu;
