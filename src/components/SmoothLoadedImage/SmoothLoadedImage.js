import React, { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import "./SmoothLoadedImage.scss";

export default function SmoothLoadedImage({ src, alt, className, width, height, lazy }) {
	const [image, setImage] = useState(null);
	// const SmoothLoadImage = new Image();

	useEffect(() => {
		setTimeout(() => {
			const SmoothLoadImage = React.createElement(
				"img",
				{
					src: src,
					alt: alt,
					className: className,
				},
				null
			);
			setImage(SmoothLoadImage);
		}, 100);
	}, [src]); // eslint-disable-line
	if (lazy) {
		return (
			<LazyLoadComponent>
				<span style={{ height, width }} className={`image__wrap ${image && "loaded"}`}>
					{image || ""}
				</span>
			</LazyLoadComponent>
		);
	} else {
		return (
			<span style={{ height, width }} className={`image__wrap ${image && "loaded"}`}>
				{image || ""}
			</span>
		);
	}
}
