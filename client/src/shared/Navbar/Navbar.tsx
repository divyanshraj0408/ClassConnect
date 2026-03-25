import React from "react";
import "./Navbar.css";

interface NavbarProps {
  logo?: React.ReactNode;
  handleClick: () => void;
  text?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo, handleClick, text }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <span className="navbar-logo">{logo}</span>
        <button className="navbar-cta" onClick={handleClick}>
          {text ?? "Get started"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;