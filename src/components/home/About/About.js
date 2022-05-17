import React from "react";

import "./about.scss";

import Avocado from "../../../images/avocado-max.png";
import Rocket from "../../../assets/icons/avocado-min.svg";

const About = () => {
	return (
		<section id="about">
			<div className="about__container">
				<div className="about__container-content">
					<div className="content__left">
						<div className="logo__container">
							<img src={Avocado} alt="" />
						</div>
					</div>
					<div className="content__right">
						<div className="title">
							<div className="title__img">
								<img src={Rocket} alt="" />
							</div>
							<div className="title__name">
								<h2>О компании</h2>
							</div>
						</div>
						<div className="content">
							<p>
								AVONFT - Это платформа для токенизации объектов искусства посредством генерации NFT
								(Уникальных невзаимозаменяемых токенов). Мы создаем технологичный и справедливый рынок
								прав интеллектуальной собственности.
							</p>
							<p>
								Таким образом наши пользователи смогут приобщиться к миру цифрового искусства, а авторы
								- токенизировать своё творчество и дополнительно заработать на этом!
							</p>
						</div>
						<div className="comments">
							<blockquote>
								Все работы на нашем маркетплейсе созданы в стандарте BEP-1155 и размещены в блокчейне
								Binance Smart Chain. А купить их можно за внутренний токен нашей платформы - AVO
							</blockquote>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
