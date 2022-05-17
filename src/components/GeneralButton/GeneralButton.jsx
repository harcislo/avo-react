import React from "react";
import { Link } from "gatsby";
import "./generalButton.scss";

const GeneralButton = ({ to, text, style, handler }) => {
	return to ? (
		<Link to={to}>
			<button onClick={handler} className={"general_button"} style={style}>
				{text || "button"}
			</button>
		</Link>
	) : (
		<button onClick={handler} className={"general_button"} style={style}>
			{text || "button"}
		</button>
	);
};

export default GeneralButton;
