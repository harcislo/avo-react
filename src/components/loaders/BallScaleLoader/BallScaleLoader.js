import React from "react";
import Loader from "react-loaders";

import "./BallScaleLoader.scss";

export default function BallScaleLoader({ scale }) {
	return (
		<Loader
			type="ball-scale"
			style={{
				transform: `scale(${scale})`,
				width: "20px",
				marginRight: "20px",
			}}
		/>
	);
}
