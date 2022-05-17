import React, { Component } from "react";
import Slider from "react-slick";
import ButtonSliderNext from "../ButtonSliderNext/ButtonSliderNext";
import ButtonSliderPrev from "../ButtonSliderPrev/ButtonSliderPrev";
import "./slideradvantage.scss";

import protectionPng from "../../../images/adv_1.png";

import Crown from "../../../assets/icons/crown.svg";
import avoPng from "../../../images/Add_apps_perspective_matte.png";
import conveniencePng from "../../../images/Briefcase_perspective_matte.png";

export default class SliderAdvantage extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: false,

			slidesToShow: 3,
			slidesToScroll: 3,
			nextArrow: <ButtonSliderNext />,
			prevArrow: <ButtonSliderPrev />,
		};
		return (
			<section id="advantages">
				<div className="Advantage__Container">
					<div className="Slide__Container">
						<div className="title">
							<div className="title__img">
								<img src={Crown} alt="" />
							</div>
							<div className="title__name">
								<h2>Преимущества avonft</h2>
							</div>
						</div>
						<Slider {...settings}>
							<div className="Slide__Container-slideItem">
								<div className="slideContent">
									<div className="photo">
										{/*заменить картинку*/}
										<img src={avoPng} alt="" />
									</div>
									<div className="content">
										<h4>AvoNFT</h4>
										<div className="advantageWrapper">
											<p>
												AvoNFT - Единственный НФТ маркетплейс с возможностью взаимодействия в
												самом распространенном мессенджере Telegram.
											</p>
											<p>
												{" "}
												Наша платформа предоставляет полный функционал для покупки, продажи и
												выпуска своих собственных NFT.
											</p>
											<p>
												Авторы AvoNFT получают полноценную защиту авторских прав в соответствии
												с российским законодательством.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="Slide__Container-slideItem">
								<div className="slideContent">
									<div className="photo">
										<img src={protectionPng} alt="" />
									</div>
									<div className="content">
										<h4>Полная правовая защита</h4>
										<div className="advantageWrapper">
											<p>
												AvoNFT обеспечивает авторам полную правовую поддержку по защите их
												авторских прав, а также защиту правообладателей осуществляя модерацию и
												проверку юридической чистоты размещаемых работ.
											</p>
											<p>
												AvoNFT полностью соответствует нормам действующего российского
												законодательства.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="Slide__Container-slideItem">
								<div className="slideContent">
									<div className="photo">
										<img src={conveniencePng} alt="" />
									</div>
									<div className="content">
										<h4>Удобство</h4>
										<div className="advantageWrapper">
											<p>
												В AvoNFT вы можете купить NFT токен не имея блокчейн кошелька,
												воспользовавшись внутренним балансом нашей платформы и в любой момент
												вывести его через наш escrow смарт контракт.
											</p>
											<p>
												Вы можете взаимодействовать с AvoNFT в telegram боте или на сайте
												используя удобные и интуитивно понятные интерфейсы.
											</p>
										</div>
									</div>
								</div>
							</div>
						</Slider>
					</div>
				</div>
			</section>
		);
	}
}
