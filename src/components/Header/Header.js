import React from "react";
import GalleryBtn from "../GalleryBtn/GalleryBtn";
import logoImg from "../../images/logo.svg";

import "./Header.scss";
import { Link, navigate } from "gatsby";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { connect, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authorization.action";
import { Button, Dropdown, Menu, Space } from "antd";
import { setUserGalleryType } from "../../redux/actions/user.action";
import { setPreviousUrl } from "../../redux/actions/url.action";
import { setCategoryUser } from "../../redux/actions/galleries.action";

const mdtp = (dispatch) => ({
	logout: () => dispatch(logout()),
});

function ConnectedHeader({ logout }) {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authorization.isAuth);

	const favoritesHandler = async () => {
		dispatch(setCategoryUser("onFavorites"));
		await navigate(`/user`);
	};

	const createdHandler = async () => {
		dispatch(setUserGalleryType("onCreated"));
		await navigate(`/user`);
	};

	const platformHandler = async () => {
		dispatch(setUserGalleryType("onPlatform"));
		await navigate(`/user`);
	};

	const exit = () => {
		localStorage.clear();
		logout();
		navigate("/");
	};
	const menu = (
		<Menu>
			<Menu.Item className="header-menu-favorites" key={4} onClick={() => platformHandler()}>
				Профиль
			</Menu.Item>
			<Menu.Item className="header-menu-favorites" key={3} onClick={() => createdHandler()}>
				Созданные
			</Menu.Item>
			<Menu.Item className="header-menu-favorites" key={2} onClick={() => favoritesHandler()}>
				Избранные
			</Menu.Item>
			<Menu.Item className="header-menu-favorites" key={5} onClick={() => navigate('/add-nft')}>
				Выпустить NFT
			</Menu.Item>
			<Menu.Item className="header-menu-exit" key={1} onClick={exit}>
				Выйти
			</Menu.Item>
		</Menu>
	);
	return (
		<header className="header container">
			<Link to="/">
				<img src={logoImg} alt="logo" className="header__logo" />
			</Link>
			<div className="header__block">
				<nav className="nav">
					<Space className="nav__list" size={25}>
						<AnchorLink to="/#about" className="nav__link">
							О компании
						</AnchorLink>

						<AnchorLink to="/#howItWorks" className="nav__link">
							Как это работает
						</AnchorLink>

						<AnchorLink to="/#advantages" className="nav__link">
							Преимущества
						</AnchorLink>

						<AnchorLink to="/#team" className="nav__link">
							Команда
						</AnchorLink>

						<Link to="/authors" className="nav__link">
							Авторы
						</Link>

						{/* <li className="nav__item">
                            <AnchorLink to="/#news" className="nav__link">
                                Новости
                            </AnchorLink>
                        </li> */}
					</Space>
				</nav>
				<div className="header__buttons">
					<GalleryBtn className={"gallery-btn-none"} to="/gallery-nft" />
					{isAuth ? (
						<Dropdown overlay={menu} placement="bottomCenter">
							<Button size="large" onClick={() => navigate(`/user`)} type="primary">
								Личный кабинет
							</Button>
						</Dropdown>
					) : (
						<Link to="/authorization">
							<Button
								onClick={() => {
									dispatch(setPreviousUrl(window.location.href));
								}}
								className="header-button-account"
								type="secondary"
								size="large"
							>
								Вход
							</Button>
						</Link>
					)}
					<BurgerMenuBtn />
				</div>
			</div>
		</header>
	);
}

export default connect(null, mdtp)(ConnectedHeader);
