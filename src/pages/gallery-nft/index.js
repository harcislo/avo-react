import React, { useEffect, useState } from "react";

import "./gallery-nft.scss";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";
import GalleryTranding from "../../components/gallery/GalleryTranding/GalleryTranding";
import GalleryNft from "../../components/gallery/Gallery/GalleryNft";
import { useDispatch, useSelector } from "react-redux";
import {getUserFavoriteNft} from "../../utils/services/user-api.service";
import { setNftLikes } from "../../redux/actions/user.action";

export default function GalleryNFT() {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authorization.isAuth);
	const [window_width, set_window_width] = useState(null);
	const [window_height, set_window_height] = useState(null);

	useEffect(() => {
		set_window_width(window.screen.width)
		set_window_height(window.screen.height)
	}, []); // eslint-disable-line

	useEffect(() => {
		(async function () {
			try {
				if (isAuth) {
					let res = await getUserFavoriteNft();
					dispatch(setNftLikes(res.data));
				}
			} catch (e) {
				console.log(e);
			}
		})();
	}, [isAuth]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		window_width &&
		window_height && (
			<>
				<BreadCrumbs />

				<GalleryTranding />

				<GalleryNft window_width={window_width} window_height={window_height} />
			</>
		)
	);
}
