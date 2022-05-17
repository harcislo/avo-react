import React from "react";
import downloadImg from "../../../images/download.svg";

export default function DownloadImageBtn({ src }) {
	return (
		<a href={src} download target="_blank" rel="noreferrer" className="work__download">
			<img src={downloadImg} alt="" />
		</a>
	);
}
