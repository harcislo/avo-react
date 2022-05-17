import React from "react";
import "./RenderArrow.scss";
import { Button } from "antd";
import { consts } from "react-elastic-carousel";

const RenderArrow = ({ type, onClick, isEdge }) => {
	const pointer = type === consts.PREV ? "👈" : "👉";
	return (
		<Button onClick={onClick} disabled={isEdge}>
			{pointer}
		</Button>
	);
};

export default RenderArrow;
