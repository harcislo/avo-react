import React, { useEffect, useState } from "react";
import GalleryBigItem from "../GalleryBigItem/GalleryBigItem";
import GalleryItem from "../GalleryItem/GalleryItem";

import "./GalleryTranding.scss";
import GalleryTrandingLoader from "../../loaders/GalleryTrandingLoader/GalleryTrandingLoader";
import {getTrendsNft} from "../../../utils/services/gallery.service";

export default function GalleryTranding() {
	const [tranding, setTranding] = useState(null);

	useEffect(() => {
		getTrandingNftData();
	}, []); // eslint-disable-line

	async function getTrandingNftData() {
		const { data } = await getTrendsNft({ limit: 7, page: 3 });
		// const { data } = await axios.get(`${apiUrls.nft}?limit=7&page=3`);
		setTranding(data);
	}

	return tranding ? (
		<div className="gallery__wrap container">
			<GalleryBigItem nft={tranding[0]} />
			<ul className="gallery__list">
				{[...tranding].splice(1).map((nft) => (
					<GalleryItem nft={nft} key={nft.id} />
				))}
			</ul>
		</div>
	) : (
		<GalleryTrandingLoader style={{ width: "100%" }} />
	);
}
