import React from "react";

import "./ErrorMessage.scss";

export default function ErrorMessage({ text }) {
	return <div className="gallery__error-message">{text}</div>;
}
