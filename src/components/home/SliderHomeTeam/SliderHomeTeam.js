import React from "react";
import Carousel from "react-elastic-carousel";
import authorImg_1 from "../../../images/turin_a.jpg";
import authorImg_2 from "../../../images/turin_k.jpg";
import authorImg_3 from "../../../images/borodin_b.jpg";
import authorImg_4 from "../../../images/gruy_s.jpg";
import authorImg_5 from "../../../images/lituchy_v.jpg";
import authorImg_6 from "../../../images/sokolov_r.jpg";
import authorImg_7 from "../../../images/kovalenko_a.jpg";
import authorImg_8 from "../../../images/kushakov_a.jpg";
import authorImg_9 from "../../../images/mezhekov_m.jpg";
import authorImg_10 from "../../../images/IlyaKhlopenkov.jpg";
import "../SliderTeam/sliderteam.scss";
import TeamIcon from "../../../assets/icons/team-icon.svg";
import "./SliderHomeTeam.scss";

// function myArrow({ type, onClick, isEdge }) {
//     const pointer = type === consts.PREV ? <div className='myArrow__content'><img src={arrowLeft} alt=""/></div> : <div className='myArrow__content'>
//         <img src={arrowRight} alt=""/></div>
//     return (
//         <button className='myArrow' onClick={onClick} disabled={isEdge}>
//             {pointer}
//         </button>
//     )
// }

const SliderHomeTeam = () => {
	return (
		<div className="Team__Container">
			<div className="Slide__Container">
				<div style={{ marginBottom: "15px" }} className="title">
					<div className="title__img">
						<img src={TeamIcon} alt="" />
					</div>
					<h2>Команда проекта</h2>
					<p>Мы всегда ищем новые таланты</p>
				</div>
				<Carousel
					showArrows={true}
					breakPoints={[
						{ width: 1, itemsToScroll: 1, itemsToShow: 1 },
						{ width: 500, itemsToScroll: 2, itemsToShow: 2 },
						{ width: 900, itemsToScroll: 3, itemsToShow: 3 },
					]}
				>
					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url(${authorImg_1})`,
								}}
							></div>
							<div className="content">
								<h4>Тюрин Александр</h4>
								<span>#Фаундер AvoNFT</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_2}")`,
								}}
							></div>
							<div className="content">
								<h4>Тюрин Кирилл</h4>
								<span>#Департамент комьюнити</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_3}")`,
								}}
							></div>
							<div className="content">
								<h4>Бородин Богдан</h4>
								<span>#PM департамент программных разработок</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_4}")`,
								}}
							></div>
							<div className="content">
								<h4>Груй Сергей</h4>
								<span>Департамент модерации</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_5}")`,
								}}
							></div>
							<div className="content">
								<h4>Литучий Владимир</h4>
								<span>Юридический департамент</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_6}")`,
								}}
							></div>
							<div className="content">
								<h4>Соколов Руслан</h4>
								<span>Руководитель направления АВО Гейм</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_7}")`,
								}}
							></div>
							<div className="content">
								<h4>Коваленко Алексей</h4>
								<span>Руководитель направления АВО Спорт</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_8}")`,
								}}
							></div>
							<div className="content">
								<h4>Кушаков Антон</h4>
								<span>Руководитель направления АВО Дизайн</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_9}")`,
								}}
							></div>
							<div className="content">
								<h4>Межеков Максим</h4>
								<span>Департамент администрирования</span>
							</div>
						</div>
					</div>

					<div className="Slide__Container-slideItem">
						<div className="slideContent">
							<div
								className="photo"
								style={{
									backgroundImage: `url("${authorImg_10}")`,
								}}
							></div>
							<div className="content">
								<h4>Илья Хлопенков</h4>
								<span>Директор по развитию</span>
							</div>
						</div>
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default SliderHomeTeam;
