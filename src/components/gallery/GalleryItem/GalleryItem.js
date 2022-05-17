import { Link } from "gatsby";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import SmoothLoadedImage from "../../SmoothLoadedImage/SmoothLoadedImage";

import "./GalleryItem.scss";

export default function GalleryItem({ nft }) {
	const MAX_DESCRIPTION_LENGTH = 25;

	const slicedDescription = nft.description.slice(0, MAX_DESCRIPTION_LENGTH);

	return (
		<LazyLoadComponent>
			<li className="gallery__item">
				<Link to={`/gallery-nft/nft?id=${nft.id}`}>
					<SmoothLoadedImage src={nft.preview_sm} width="100%" height="100%" className="gallery__img" />

					<div className="gallery__content">
						<div className="gallery__title">
							{nft.description.length > MAX_DESCRIPTION_LENGTH
								? slicedDescription + "..."
								: nft.description}
						</div>
						<div className="gallery__block">
							<div className="gallery__heading">Цена</div>
							<div className="gallery__desc">{nft.price.avo} avo</div>
						</div>
					</div>
				</Link>
			</li>
		</LazyLoadComponent>
	);
}
