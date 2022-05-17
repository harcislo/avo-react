import React from "react";
import "./buttonsliderprev.scss";

function ButtonSliderPrev(props) {
	const { className, style, onClick } = props;
	return <div style={style} className={`button_prev-slider + ${className}`} onClick={onClick} />; //eslint-disable-line
}
export default ButtonSliderPrev;
