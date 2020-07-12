import React from "react";
import "./Button.css";

const Button = (props) => {
  const { onClick, classname, children } = props;

  return (
    <button className={classname} value={children} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
