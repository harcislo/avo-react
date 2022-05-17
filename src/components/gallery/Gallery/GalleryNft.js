import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGalleryData} from "../../../utils/services/gallery.service";
import {LazyLoadComponent} from "react-lazy-load-image-component";
import {Row} from "antd";
import GalleryCard from "../GalleryCard/GalleryCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CategoriesNft from "../../Categories/CategoriesNft";
import GalleryGridLoader from "../../loaders/GalleryGridLoader/GalleryGridLoader";
import {
	setCurrentPage,
	setData,
	setIsGalleryEnd,
	setIsLoading,
} from "../../../redux/actions/galleries.action";

const GalleryNft = ({window_width, window_height}) => {
	const {currentPage, data, isLoading, isGalleryEnd, categoryNft} = useSelector((state) => state.galleries);

	const [LIMIT_PER_PAGE, SET_LIMIT_PER_PAGE] = useState(
		window_width < 768
			? 18
			: currentPage === 1
				? Math.floor(window_height / 329.562) * Math.floor(window_width / 270) -
				Math.floor(window_width / 270)
				: Math.floor(window_width / 270) * 2
	)

	const [load, setLoad] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		if (isLoading && !isGalleryEnd) {
			getGalleryData({
				type: "nft",
				LIMIT_PER_PAGE,
				current: currentPage,
				category: categoryNft,
			})
				.then((res) => {
					if (res?.data?.length) {
						dispatch(setCurrentPage(currentPage + 1));
						dispatch(setData([...data, ...res.data]));
					} else {
						dispatch(setIsGalleryEnd(true));
					}
				})
				.finally(() => {
					dispatch(setIsLoading(false));
				});
		}
	}, [isLoading, load]); // eslint-disable-line

	useEffect(() => {
		dispatch(setData([]));
		dispatch(setCurrentPage(1));
		dispatch(setIsGalleryEnd(false));
		dispatch(setIsLoading(true));
		setLoad(!load);
	}, [categoryNft]); // eslint-disable-line

	useEffect(() => {
		SET_LIMIT_PER_PAGE(
			window_width < 768
				? 18
				: currentPage === 1
					? Math.floor(window_height / 329.562) * Math.floor(window_width / 270) -
					Math.floor(window_width / 270)
					: Math.floor(window_width / 270) * 2
		)
	}, [currentPage]); // eslint-disable-line

	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1200) {
			dispatch(setIsLoading(true));
		}
	};

	useEffect(() => {
		document.addEventListener("scroll", scrollHandler);
		return function () {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, []); // eslint-disable-line
	return (
		<>
			<CategoriesNft />

			{isGalleryEnd && data.length === 0 && <ErrorMessage text="Ничего не найдено :(" />}

			<ul className="gallery__works__list">
				{data.map((e, i) => (
					<LazyLoadComponent key={i}>
						<GalleryCard nft={e} />
					</LazyLoadComponent>
				))}
			</ul>

			{
				!isGalleryEnd && window_width > 768 && LIMIT_PER_PAGE < data.length && (
					<Row justify="center" align="middle">
						<ul className="gallery__works__list">
							{[...Array(Math.floor(window_width / 270)).keys()].map((e, i) => (
								<GalleryGridLoader key={i} />
							))}
						</ul>
					</Row>
				)
			}


		</>
	);
};

export default GalleryNft;
