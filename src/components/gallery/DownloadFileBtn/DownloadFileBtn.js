import React from "react";
import downloadImg from "../../../images/download.svg";

export default function DownloadFileBtn({ src }) {
	// const splitFilename = (str) => {
	// 	const parsedStrArr = str.split("/");
	// 	return parsedStrArr[parsedStrArr.length - 1];
	// };

	return (
		<a href={src} download target="_blank" rel="noreferrer" className="work__download">
			<img src={downloadImg} alt="" />
		</a>
	);
}
