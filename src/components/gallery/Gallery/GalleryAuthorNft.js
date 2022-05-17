import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGalleryData} from "../../../utils/services/gallery.service";
import {LazyLoadComponent} from "react-lazy-load-image-component";
import GalleryCard from "../GalleryCard/GalleryCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GalleryGridLoader from "../../loaders/GalleryGridLoader/GalleryGridLoader";
import CategoriesAuthorNft from "../../Categories/CategoriesAuthorNft";
import {Row} from "antd";
import {setCurrentPage, setData, setIsGalleryEnd, setIsLoading} from "../../../redux/actions/galleries.action";

const GalleryAuthorNft = ({window_width, window_height, authorId}) => {
	const {currentPage, data, isLoading, isGalleryEnd, categoryAuthorNft} = useSelector((state) => state.galleries);
	const [load, setLoad] = useState(false);

	const [LIMIT_PER_PAGE, SET_LIMIT_PER_PAGE] = useState(
		window_width < 768
			? 18
			: currentPage === 1
			? Math.floor(window_height / 329.562) * Math.floor(window_width / 270) - Math.floor(window_width / 270)
			: Math.floor(window_width / 270) * 2
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isLoading && !isGalleryEnd) {
			getGalleryData({
				type: "by-author",
				LIMIT_PER_PAGE,
				current: currentPage,
				category: categoryAuthorNft,
				authorId,
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
	}, [isLoading, load]);

	useEffect(() => {
		dispatch(setData([]));
		dispatch(setCurrentPage(1));
		dispatch(setIsGalleryEnd(false));
		dispatch(setIsLoading(true));
		setLoad(!load);
	}, [categoryAuthorNft]);

	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1000) {
			dispatch(setIsLoading(true));
		}
	};

	useEffect(() => {
		document.addEventListener("scroll", scrollHandler);
		return function () {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	useEffect(() => {
		SET_LIMIT_PER_PAGE(
			window_width < 768
				? 18
				: currentPage === 1
				? Math.floor(window_height / 329.562) * Math.floor(window_width / 270) - Math.floor(window_width / 270)
				: Math.floor(window_width / 270) * 2
		);
	}, [currentPage]);
	return (
		<>
			<CategoriesAuthorNft />

			{isGalleryEnd && data.length === 0 && <ErrorMessage text="Ничего не найдено :(" />}

			<ul className="gallery__works__list">
				{data.map((e, i) => (
					<LazyLoadComponent key={i}>
						<GalleryCard nft={e} />
					</LazyLoadComponent>
				))}
			</ul>

			{!isGalleryEnd && window_width > 768  && LIMIT_PER_PAGE < data?.length && (
				<Row justify="center" align="middle">
					<ul className="gallery__works__list">
						{[...Array(Math.floor(window_width / 270)).keys()].map((e, i) => (
							<GalleryGridLoader key={i} />
						))}
					</ul>
				</Row>
			)}
		</>
	);
};

export default GalleryAuthorNft;
