import React, { useEffect, useState } from "react";
import fireImg from "../../../images/fire.png";
import Carousel from "react-elastic-carousel";
import "./PopularHomeJobs.scss";
import Rocket from "../../../assets/icons/rocket.svg";
import PrevBtn from "../../ArrowsBtns/PrevBtn";
import NextBtn from "../../ArrowsBtns/NextBtn";
import PopularJobItem from "./PopularJobItem";
import GalleryBtn from "../../GalleryBtn/GalleryBtn";
import {getPopularNft} from "../../../utils/services/gallery.service";

const PopularHomeJobs = () => {
	let carousel;
	const [popularNft, setPopularNft] = useState(null);
	useEffect(() => {
		(async function getPopularNFT() {
			const res = await getPopularNft({ limit: 12 });
			setPopularNft(res.data);
		})();
	}, []); // eslint-disable-line
	return (
		<>
			<div className="popular_header">
				<div className="popular_header_left">
					<div className="popular_header_img">
						<img src={Rocket} alt="Rocket" />
					</div>
					<div className="popular_header_title">
						<h2>Популярные работы</h2>
						<span>Наши лучшие работы на сегодняшний день</span>
					</div>
				</div>

				<div className="popular_header_left">
					<div className="popular_header_btns">
						<PrevBtn onClick={() => carousel.slidePrev()} style={{ margin: 0 }} />
						<NextBtn onClick={() => carousel.slideNext()} style={{ margin: 0 }} />
					</div>
				</div>
			</div>

			<div className="popular_container">
				<div className="popular_info">
					<img src={fireImg} alt="fireImg" />
					<span>#Trending</span>
				</div>

				<div className="popular_slider">
					{popularNft ? (
						<Carousel
							itemPadding={[0, 5]}
							breakPoints={[
								{ width: 1, itemsToScroll: 1, itemsToShow: 1, showArrows: false },
								{ width: 500, itemsToScroll: 2, itemsToShow: 2, showArrows: false },
								{ width: 820, itemsToScroll: 3, itemsToShow: 3, showArrows: false },
								{ width: 1020, itemsToScroll: 4, itemsToShow: 4, showArrows: false },
							]}
							pagination={true}
							showArrows={false}
							ref={(ref) => (carousel = ref)}
							itemsToScroll={3}
							itemsToShow={3}
						>
							{popularNft.map((nft) => (
								<PopularJobItem key={nft.id} nft={nft} />
							))}
						</Carousel>
					) : (
						""
					)}
				</div>
			</div>
			<div className={"popularHomeBtn"}>
				<GalleryBtn to="/gallery-nft" style={{ margin: "auto" }} />
			</div>
		</>
	);
};

export default PopularHomeJobs;
