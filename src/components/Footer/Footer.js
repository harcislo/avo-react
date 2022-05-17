import React from "react";
import logoImg from "../../images/logo.svg";
import telegramImg from "../../images/telegram.png";
import avoImg from "../../images/avo.svg";

import "./Footer.scss";
import { Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const Footer = () => {
	return (
		<footer className="footer">
			<div id="footer__content" className="container">
				<div className="footer__block">
					<Link to="/" className="footer__logo">
						<img src={logoImg} alt="" />
					</Link>
					<div className="footer__desc">AVOCADO - первый NFT маркетплейс в Telegram!</div>
					<ul className="footer__socials">
						<li className="footer__social">
							<a href="https://t.me/AvoNFT_bot" target="_blank" rel="noreferrer">
								<img src={telegramImg} alt="" />
							</a>
						</li>
						{/*<li className="footer__social">*/}
						{/*    <a href="" target="_blank">*/}
						{/*        <img src={facebookImg} alt="" />*/}
						{/*    </a>*/}
						{/*</li>*/}
						{/*<li className="footer__social">*/}
						{/*    <a href="https://www.instagram.com/avocadonft/?utm_medium=copy_link" target="_blank">*/}
						{/*        <img src={instagramImg} alt="" />*/}
						{/*    </a>*/}
						{/*</li>*/}
					</ul>
				</div>
				<nav className="footer__nav">
					<ul className="footer__list">
						<li className="footer__item">
							<AnchorLink to="/#about" className="footer__link">
								О компании
							</AnchorLink>
						</li>

						<li className="footer__item">
							<AnchorLink to="/#advantages" className="footer__link">
								Преимущества
							</AnchorLink>
						</li>
					</ul>
					<ul className="footer__list">
						<li className="footer__item">
							<AnchorLink to="/#howItWorks" className="footer__link">
								Как это работает
							</AnchorLink>
						</li>
						<li className="footer__item">
							<AnchorLink to="/#team" className="footer__link">
								Команда
							</AnchorLink>
						</li>
						{/* <li className="footer__item">
                            <AnchorLink to="/#news" className="footer__link">
                                Новости
                            </AnchorLink>
                        </li> */}
					</ul>
				</nav>
				<a href="https://t.me/AvoNFT_bot" target="_blank" rel="noreferrer" className="footer__btn green-btn">
					<img src={avoImg} alt="" /> Начать пользоваться
				</a>
			</div>
			<div className="footer__copyright">Avonft {new Date().getFullYear()} © Все права защищены</div>
		</footer>
	);
};

export default Footer;
