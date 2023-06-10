import React from "react";
import { FiType } from "react-icons/fi";

const Header = ({ timer }) => {
  return (
    <div className="header">
      <div className="header-right">
       
        <div className="heading-text">
      
          <h1>touchtype</h1>
        </div>
      </div>
      <div className="header-left">
        <p>
          <span className="active">time</span>
        </p>
        <p>
          <span className="active">{timer}</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
