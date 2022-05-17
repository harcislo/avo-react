import React, {useEffect, useState} from "react";
import Categories from "../../Categories/Categories.js";
import GalleryCard from "../GalleryCard/GalleryCard.js";
import {LazyLoadComponent} from "react-lazy-load-image-component";
import AuthorCard from "../../authors/AuthorCard/AuthorCard";
import GalleryGridLoader from "../../loaders/GalleryGridLoader/GalleryGridLoader.js";
import {connect, useDispatch} from "react-redux";
import ErrorMessage from "../ErrorMessage/ErrorMessage.js";
import {getUser, getUserFavoriteNft} from "../../../utils/services/user-api.service";
import {setNftLikes, setNfts} from "../../../redux/actions/user.action";
import {getGalleryNft} from "../../../utils/services/gallery.service";

function Gallery({ type = "nft", authorId, category, title, isAuth }) {
	let [LIMIT_PER_PAGE, SET_LIMIT_PER_PAGE] = useState(null);
	const [pagesLoaded, setPagesLoaded] = useState({
		current: 1,
		prev: 1,
	});

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMess, setErrorMess] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (loading && type !== "userNftFavorite" && type !== "onPlatform" && !errorMess) {
			LIMIT_PER_PAGE &&
				getData().then(() => {
					let current = pagesLoaded.current;
					let prev = pagesLoaded.prev;

					setPagesLoaded(
						current === prev
							? { ...pagesLoaded, current: pagesLoaded.current + 1 }
							: { current: pagesLoaded.current + 1, prev: pagesLoaded.prev + 1 }
					);
				});

			if (isAuth && type !== "userNftFavorite") {
				getUserFavoriteNft().then((res) => dispatch(setNftLikes(res.data.likes)));
			}
			if (isAuth && type !== "onPlatform") {
				getUser().then((res) => dispatch(setNfts(res.data.nfts)));
			}
		}
	}, [category, loading, LIMIT_PER_PAGE]); // eslint-disable-line

	useEffect(() => {
		try {
			setErrorMess(null);
			LIMIT_PER_PAGE && !errorMess && getData();
		} catch (e) {
			console.log(e);
		}
	}, [category, LIMIT_PER_PAGE]); // eslint-disable-line

	useEffect(() => {
		if (window.screen.width < 768) {
			SET_LIMIT_PER_PAGE(15);
		} else {
			SET_LIMIT_PER_PAGE(
				pagesLoaded.current === 1
					? Math.floor(window.screen.height / 329.562) * Math.floor(window.screen.width / 270) -
							Math.floor(window.screen.width / 270)
					: Math.floor(window.screen.width / 270) * 2
			);
		}
		document.addEventListener("scroll", scrollHandler);
		return function () {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, []); // eslint-disable-line

	const scrollHandler = (e) => {
		if (
			e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 700 &&
			!errorMess
		) {
			setLoading(true);
		}
	};

	async function getData() {
		try {
			let res;
			switch (type) {
				case "nft":
					res = await getGalleryNft({
						limit: LIMIT_PER_PAGE,
						page: pagesLoaded.current,
						category: category,
					});
					break;

				case "by-author":
					res = await getGalleryNft({
						limit: LIMIT_PER_PAGE,
						page: pagesLoaded.current,
						category: category,
						authorId: authorId,
					});
					break;

				case "authors":
					res = await getGalleryNft({
						galleryType: "authors",
						limit: LIMIT_PER_PAGE,
						page: pagesLoaded.current,
						category: category,
					});

					break;
				case "userNftFavorite":
					res = await getUserFavoriteNft();
					break;

				case "onPlatform":
					let intermediateResponse = await getUser();
					res = { data: intermediateResponse.data.nfts };
					break;

				default:
					break;
			}

			setLoading(false);
			if (res.data.error) {
				setErrorMess(res.data.error);
			}
			if (res.data.error && data.length === 0) {
				setData(res.data);
			} else {
				const updatedData = pagesLoaded.current === pagesLoaded.prev ? res.data : [...data, ...res.data];
				setData(updatedData);
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			{type !== "userNftFavorite" && type !== "onPlatform" && (
				<Categories type={type} title={title} setPagesLoaded={setPagesLoaded} />
			)}

			<article className="gallery__works">
				{data.length > 0 ? (
					<>
						<ul className="gallery__works__list">
							{data.map((e, i) => (
								<LazyLoadComponent key={i}>
									{type === "authors" ? <AuthorCard author={e} /> : <GalleryCard nft={e} />}
								</LazyLoadComponent>
							))}
						</ul>
						{data.length < LIMIT_PER_PAGE
							? ""
							: // <LoadMoreBtn setLoading={setLoading} pagesLoaded={pagesLoaded} setPagesLoaded={setPagesLoaded} loading={loading} />
							  ""}
					</>
				) : data.error ? (
					<>
						<ErrorMessage text="Ничего не найдено :(" />
						<ul className="gallery__works__list"></ul>
					</>
				) : (
					<>
						<ul className="gallery__works__list">
							<GalleryGridLoader />
						</ul>
					</>
				)}
			</article>
		</>
	);
}

const mstp = ({ gallery, authorization }) => ({
	category: gallery.category.current,
	isAuth: authorization.isAuth,
});

export default connect(mstp)(Gallery);
