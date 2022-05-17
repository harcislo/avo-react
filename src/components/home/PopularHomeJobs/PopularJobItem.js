import React from "react";
import { Link } from "gatsby";
import { makeNftImageSrc } from "../../../utils/nft.utils";
import Avo from "../../../assets/icons/avocado-min.svg";
import "./PopularJobItem.scss";

const PopularJobItem = ({ nft }) => {
	return (
		<Link to={`/gallery-nft/nft?id=${nft.id}`}>
			<div className="item_container_popular">
				<div className="slideContent">
					<div
						className="photo_item"
						style={{
							backgroundImage: `url(${makeNftImageSrc(nft)})`,
						}}
					></div>

					<div className="content_popular">
						<p>{nft.title.length > 20 ? `${nft.title.slice(0, 20)}  ...` : nft.title}</p>
						<div className="price">
							<div className="price-icon">
								<img src={Avo} alt="" />
							</div>

							<div className="price-value">
								<p>Цена</p>
								<span>{nft.price.avo} avo</span>
							</div>
						</div>
						<button className="button-buy">Купить</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default PopularJobItem;
