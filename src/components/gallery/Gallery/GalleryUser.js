import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGalleryData} from "../../../utils/services/gallery.service";
import {navigate} from "gatsby";
import {LazyLoadComponent} from "react-lazy-load-image-component";
import GalleryCard from "../GalleryCard/GalleryCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GeneralButton from "../../GeneralButton/GeneralButton";
import {
	setCategoryUser,
	setData,
	setIsGalleryEnd,
	setIsLoading,
} from "../../../redux/actions/galleries.action";
import {Button, Row, Space, Typography} from "antd";
import {setPreviousUrl} from "../../../redux/actions/url.action";
import GalleryUserCard from "../GalleryCard/GalleryUserCard";

const GalleryUser = () => {
	const {data, categoryUser} = useSelector((state) => state.galleries);

	const author = useSelector((state) => state.user.author);
	const [load, setLoad] = useState(false);

	const dispatch = useDispatch();

	const galleryTypeHandler = (type) => {
		dispatch(setCategoryUser(type));
	};

	useEffect(() => {
		getGalleryData({
			type: categoryUser,
			authorId: author?.id
		})
			.then((res) => {
				if (res?.data?.length) {
					dispatch(setData([...data, ...res.data]));
				} else {
					dispatch(setIsGalleryEnd(true));
				}
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
		return () => dispatch(setData([]));
	}, [load]); // eslint-disable-line

	useEffect(() => {
		dispatch(setData([]));
		setLoad(!load);
	}, [categoryUser]); // eslint-disable-line

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
	}, []); // eslint-disable-line

	return (
		<>
			<div className="user_tabs">
				<GeneralButton
					handler={() => galleryTypeHandler("onPlatform")}
					className="user_gallery_btn"
					style={
						categoryUser === "onPlatform"
							? {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								width: "213px",
							}
							: {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								background: "transparent",
								width: "213px",
							}
					}
					text="NFT на платформе"
				/>
				<GeneralButton
					handler={() => galleryTypeHandler("onBlockchain")}
					className="user_gallery_btn"
					style={
						categoryUser === "onBlockchain"
							? {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								width: "213px",
							}
							: {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								background: "transparent",
								width: "213px",
							}
					}
					text="NFT в блокчейне"
				/>
				<GeneralButton
					handler={() => galleryTypeHandler("onFavorites")}
					className="user_gallery_btn"
					style={
						categoryUser === "onFavorites"
							? {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								width: "213px",
							}
							: {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								background: "transparent",
								width: "213px",
							}
					}
					text="Избранные"
				/>
				<GeneralButton
					handler={() => galleryTypeHandler("onCreated")}
					className="user_gallery_btn"
					style={
						categoryUser === "onCreated"
							? {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								width: "213px",
							}
							: {
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								background: "transparent",
								width: "213px",
							}
					}
					text="Созданные"
				/>
			</div>
			{categoryUser === "onCreated" &&

				<Row justify="center">
					<Space direction="vertical">


						{
							!author && <div style={{textAlign: 'center'}}><Typography.Text>Для выпуска NFT зарегистрируйтесь как автор</Typography.Text></div>

						}
						<Space style={{
							justifyContent: 'center'
						}} wrap align='center' direction='horizontal'>

							{author ? (
								author.status === 'moderation' ? (
									<div style={{marginTop: 10, marginBottom: 10}} >
										Ожидайте подверждения регистрации
									</div>
								) : (
									null
								)
							) : (
								<div>
									<div style={{textAlign: 'center', marginBottom: 10}}>
										<Button
											style={{marginTop: 10}}
											onClick={() => {
												dispatch(setPreviousUrl(window.location.href))
												navigate('/author/signup')
											}}
										>
											Стать автором
										</Button>
									</div>
								</div>
							)}

							<div style={{textAlign: 'center', marginBottom: 10}}>
								<Button
									style={{marginTop: 10}}
									onClick={() => {
										dispatch(setPreviousUrl(window.location.href))
										navigate('/add-nft')
									}}
								>
									{author ? 'Выпустить NFT' : 'Выпустить NFT без регистрации'}
								</Button>
							</div>
						</Space>
					</Space>
				</Row>
			}
			{(data.length === 0 && categoryUser !== "onCreated") && <ErrorMessage text="Ничего не найдено :(" />}

			<ul className="gallery__works__list">
				{data.map((e, i) => (
					<LazyLoadComponent key={i}>
						{
							(categoryUser === 'onPlatform' || categoryUser === 'onBlockchain')
								? <GalleryUserCard nft={e} />
								: <GalleryCard nft={e} isUserNft={categoryUser === 'onCreated'} />
						}

					</LazyLoadComponent>
				))}
			</ul>
		</>
	);
};

export default GalleryUser;
