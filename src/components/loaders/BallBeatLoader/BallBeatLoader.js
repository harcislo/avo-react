import React from "react";
import Loader from "react-loaders";

import "./BallBeatLoader.scss";

export default function BallBeatLoader({ scale }) {
	return <Loader type="ball-beat" style={{ transform: `scale(${scale})` }} />;
}
