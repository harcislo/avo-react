import React, { useState } from "react";
import { Link } from "gatsby";
import SmoothLoadedImage from "../SmoothLoadedImage/SmoothLoadedImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import avoImg from "../../images/avo.svg";
import noneImg from "../../images/whiteBackground.png";
import { useSelector } from "react-redux";
import CategoryUser from "../CategoryUser/CategoryUser";
import ErrorMessage from "../gallery/ErrorMessage/ErrorMessage";

const GalleryUser = ({ userNfts }) => {
	const galleryType = useSelector((state) => state.user.galleryType);
	const categoryId = useSelector((state) => state.user.categoryId);

	//Можно вынести в utils
	const categoryFiltered = (categoryId, arr) => {
		if (categoryId == null) {
			return arr;
		} else {
			const newArr = arr.filter((el) => el.category_id == categoryId);
			return newArr;
		}
	};
	const [currentPage, setCurrentPage] = useState(1);
	const [limitPerPage] = useState(24);

	const lastCardIndex = currentPage * limitPerPage;
	const firstCardIndex = lastCardIndex - limitPerPage;

	const currentCards = userNfts.slice(0, lastCardIndex);

	return galleryType === "onPlatform" || galleryType === "onBlockchain" || galleryType === "onFavorites" ? (
		<>
			<CategoryUser setCurrentPage={setCurrentPage} />

			{categoryFiltered(categoryId, currentCards).length > 0 ? (
				categoryFiltered(categoryId, currentCards).map((nft, index) => (
					<li
						key={index}
						style={{ listStyleType: "none", margin: 10 }}
						className="works__item user_gallery_card"
					>
						<Link to={`/gallery-nft/nft?id=${nft.id}`}>
							<div className="works__img-wrap">
								{nft.img ? (
									<SmoothLoadedImage
										src={nft.img}
										className="works__img"
										height="200px"
										width="100%"
									/>
								) : (
									<SmoothLoadedImage
										src={noneImg}
										className="works__img"
										height="200px"
										width="100%"
									/>
								)}
							</div>
							<div className="works__title">
								{nft.title.length > 18 ? nft.title.slice(0, 18) + "..." : nft.title}
							</div>
							<div className="works__block">
								<button className="works__btn">
									<LazyLoadImage src={avoImg} />
								</button>
								<div className="works__heading">
									<div className="works__sub-title">Цена</div>
									<div className="works__price">{nft.price.avo} avo</div>
								</div>
							</div>
						</Link>
					</li>
				))
			) : (
				<div style={{ marginLeft: "auto", marginRight: "auto" }}>
					<ErrorMessage text="Не найдено :(" />
				</div>
			)}
			{lastCardIndex < userNfts.length ? (
				<button className="works__load-more green-btn" onClick={() => setCurrentPage(currentPage + 1)}>
					Загрузить еще
				</button>
			) : null}
		</>
	) : (
		<div style={{ marginLeft: "auto", marginRight: "auto" }}>
			<ErrorMessage text="Не найдено :(" />
		</div>
	);
};

export default GalleryUser;
