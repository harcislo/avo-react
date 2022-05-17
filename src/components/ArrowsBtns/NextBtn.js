import React from "react";
import "./NextBtn.js.scss";

const NextBtn = (props) => {
	return <div onClick={props.onClick} className={`button_next ${props.className}`} />; // eslint-disable-line
};

export default NextBtn;
