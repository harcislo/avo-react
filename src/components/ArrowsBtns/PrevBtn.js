import React from "react";
import "../home/ButtonSliderPrev/buttonsliderprev.scss";

const PrevBtn = (props) => {
	return <div style={props.style} onClick={props.onClick} className={`button_prev-slider ${props.className}`} />; // eslint-disable-line
};

export default PrevBtn;
