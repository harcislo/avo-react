import React from "react";

import telegramImg from "../../images/telegram_1.svg";
import arrowImg from "../../images/arrow_white.svg";

const Buybtn = ({ href }) => {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className="work__btn">
			<img src={telegramImg} alt="" />
			Купить
			<img src={arrowImg} alt="" />
		</a>
	);
};

export default Buybtn;
