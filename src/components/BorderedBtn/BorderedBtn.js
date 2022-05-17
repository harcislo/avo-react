import { Button } from "antd";
import { Link } from "gatsby";
import React from "react";

import "./BorderedBtn.scss";

export default function BorderedBtn({ text, to, className = "" }) {
	return (
		<Button className={className} type="primary">
			<Link to={to}>{text || "empty"}</Link>
		</Button>
	);
}
