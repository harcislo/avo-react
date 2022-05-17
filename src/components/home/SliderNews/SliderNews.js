import React, { Component } from "react";
import Slider from "react-slick";
import ButtonSliderNext from "../ButtonSliderNext/ButtonSliderNext";
import ButtonSliderPrev from "../ButtonSliderPrev/ButtonSliderPrev";
import "./slidernews.scss";

import SlidePhoto_1 from "../../../images/slide_ph-1.png";
import SlidePhoto_2 from "../../../images/slide_ph-2.png";
import MarketingPerspective from "../../../assets/icons/marketing_perspecive.svg";

export default class SliderNews extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: false,
			initialSlide: 0,
			slidesToShow: 2,
			slidesToScroll: 1,
			nextArrow: <ButtonSliderNext />,
			prevArrow: <ButtonSliderPrev />,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: false,
					},
				},
				{
					breakpoint: 425,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: false,
					},
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
					},
				},
			],
		};
		return (
			<section id="news">
				<div className="News__Container">
					<div className="Slide__Container">
						<div className="title">
							<div className="title__img">
								<img src={MarketingPerspective} alt="" />
							</div>
							<div className="title__name">
								{" "}
								<h2>Новости</h2>
							</div>
						</div>
						<Slider {...settings}>
							<div className="Slide__Container-slideItem">
								<div className="slideContent">
									<div className="photo">
										<img src={SlidePhoto_1} alt="" />
									</div>
									<div className="content">
										<h4>Первая новость</h4>
										<p>
											Технологии интернета стремительно развиваются и 2021 год стал стартовым для
											бурного развития нового этапа совершенствования цифровой среды.{" "}
										</p>
										<a className="link_post">Подробнее</a>
									</div>
								</div>
							</div>
							<div className="Slide__Container-slideItem">
								<div className="slideContent">
									<div className="photo">
										<img src={SlidePhoto_2} alt="" />
									</div>
									<div className="content">
										<h4>Вторая новость</h4>
										<p>
											Технологии интернета стремительно развиваются и 2021 год стал стартовым для
											бурного развития нового этапа совершенствования цифровой среды.{" "}
										</p>
										<a className="link_post" href="#">
											Подробнее
										</a>
									</div>
								</div>
							</div>
							<div className="Slide__Container-slideItem">
								<div className="slideContent">
									<div className="photo">
										<img src={SlidePhoto_1} alt="" />
									</div>
									<div className="content">
										<h4>Первая новость</h4>
										<p>
											Технологии интернета стремительно развиваются и 2021 год стал стартовым для
											бурного развития нового этапа совершенствования цифровой среды.{" "}
										</p>
										<a className="link_post" href="#">
											Подробнее
										</a>
									</div>
								</div>
							</div>
							<div className="Slide__Container-slideItem">
								<div className="slideContent">
									<div className="photo">
										<img src={SlidePhoto_2} alt="" />
									</div>
									<div className="content">
										<h4>Вторая новость</h4>
										<p>
											Технологии интернета стремительно развиваются и 2021 год стал стартовым для
											бурного развития нового этапа совершенствования цифровой среды.{" "}
										</p>
										<a className="link_post" href="#">
											Подробнее
										</a>
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
