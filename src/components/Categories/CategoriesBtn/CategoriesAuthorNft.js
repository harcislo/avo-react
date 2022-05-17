import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAuthorNft, setCurrentPage } from "../../../redux/actions/galleries.action";

const CategoriesAuthorNftBtn = ({ img, id, text }) => {
	const [categoryImg, setCategoryImg] = useState({ default: img || null });
	const category = useSelector((state) => state.galleries.categoryAuthorNft);
	const dispatch = useDispatch();
	useEffect(() => {
		(async function importImage() {
			setCategoryImg(await import(`../../../images/categories_img-${id}.svg`));
		})();
	}, []); // eslint-disable-line

	return (
		<li
			className="categories__item"
			onClick={() => {
				dispatch(setCategoryAuthorNft(id));
				dispatch(setCurrentPage(1));
			}}
		>
			<span className={`categories__btn ${category === id ? "active" : ""} `}>
				{categoryImg.default ? (
					<img src={categoryImg.default} className="categories__img" />
				) : (
					<Spin className="categories__img loader" />
				)}
				{text}
			</span>
		</li>
	);
};

export default CategoriesAuthorNftBtn;
