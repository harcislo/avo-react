import React, {useEffect} from "react";

import "./user.scss";
import {useDispatch, useSelector} from "react-redux";
import {setFavoriteNft, setNftLikes, setNfts} from "../../redux/actions/user.action";

import fakeUserImg from "../../images/fakeUser.png";
import {navigate} from "gatsby";
import {getUser, getUserFavoriteNft} from "../../utils/services/user-api.service";
import {Typography} from "antd";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";
import GalleryUser from "../../components/gallery/Gallery/GalleryUser";

const User = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authorization.isAuth);
	const userName = useSelector((state) => state.user.userName);
	const userId = useSelector((state) => state.user.userId);
	const galleryType = useSelector((state) => state.galleries.galleryType);

	useEffect(() => {
		(async function () {
			try {
				if (!isAuth) {
					navigate(`/`);
				}
				if (isAuth) {
					let res = await getUserFavoriteNft();
					dispatch(setNftLikes(res.data));
				}
				if (userId && isAuth) {
					if (galleryType === "onPlatform") {
						getUser().then((res) => dispatch(setNfts(res.data.nfts)));
					}
					if (galleryType === "onFavorites") {
						getUserFavoriteNft().then((res) => {
							console.log(res)
							dispatch(setFavoriteNft(res.data))
						});
					}
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [userId, galleryType]); // eslint-disable-line

	return (
		<>
			<BreadCrumbs />

			<div className="user_info_wrapper">
				<div className="userLogo">
					<img style={{borderRadius: "50%"}} src={fakeUserImg} alt="userImg" />
				</div>

				<div className="user_title">
					<Typography.Title level={2}>{userName || "Пользователь AvoNFT"}</Typography.Title>
				</div>
			</div>

			<GalleryUser />
		</>
	);
};

export default User;
