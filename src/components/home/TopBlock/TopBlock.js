import React from "react";
import "./topblock.scss";
import IconTelegram from "../../../assets/icons/telegram-background.svg";
import MobileImg from "../../../images/mobile.png";
import Telegram from "../../../assets/icons/telegram__icons.svg";

const TopBlock = () => {
	return (
		<section className="top__content">
			<div className="top__content-left">
				<div className="back__marker">
					<p>#NFT Marketplace</p>
				</div>
				<h1 className="title">Avocado</h1>
				<h2>
					первый <span className="word__green">NFT</span>
				</h2>
				<h2>
					маркетплейс в{" "}
					<div className="link_telegram">
						<img src={IconTelegram} alt="" />
						Telegram!
					</div>
				</h2>
				<p>
					{/* Равным образом начало повседневной работы по формированию
                    позиции обеспечивает широкому кругу (специалистов) */}
				</p>

				<a href="https://t.me/AvoNFT_bot" target="_blank" rel="noreferrer">
					<button className="button_start_use">Начать пользоваться</button>
				</a>
			</div>
			<div className="top__content-right">
				<div className="promotion_block">
					<img src={MobileImg} alt="" />
					{/* <div className="bottom__marker">
                        <div className="bottom__marker-content">
                            <div className="photo">
                                <img src={MarkerImg} alt="" />
                            </div>
                            <p>Описание работы</p>
                        </div>
                    </div> */}
					<a className="telegram__link" href="https://t.me/AvoNFT_bot" target="_blank" rel="noreferrer">
						<img rel="noreferrer" src={Telegram} alt="" />
					</a>
				</div>
			</div>
			<a href="https://t.me/AvoNFT_bot" target="_blank" rel="noreferrer">
				<button className="button_start_use mob__version">Начать пользоваться</button>
			</a>
		</section>
	);
};

export default TopBlock;
