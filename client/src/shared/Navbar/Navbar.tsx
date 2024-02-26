import React from "react";
import Link from "../button/LinkElement";
import "./Navbar.css";
interface NavbarProps {
  logo?: React.ReactNode;
  handleClick: () => void;
  text?: any;
}
const Navbar = (props: NavbarProps) => {
  return (
    <>
      <div className="navbar">
        <div className="container navbar-container">
          {props.logo}
          <Link text={props.text} handleClick={props.handleClick} />
        </div>
      </div>
    </>
  );
};
export default Navbar;
