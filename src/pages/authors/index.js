import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";
import "./authors.scss";
import GalleryAuthors from "../../components/gallery/Gallery/GalleryAuthors";
//TODO: remove unused import and fix categy styles
//do not remove this becayse category page styles brokes
import Gallery from "../../components/gallery/Gallery/Gallery";
export default function Authors() {
	const [window_width, set_window_width] = useState(null);
	const [window_height, set_window_height] = useState(null);

	useEffect(() => {
		set_window_width(window.screen.width);
		set_window_height(window.screen.height);
	}, []);
	return (
		window_width &&
		window_height && (
			<>
				<BreadCrumbs />
				{/*<Gallery type="authors" />*/}
				<GalleryAuthors window_width={window_width} window_height={window_height} />
			</>
		)
	);
}
