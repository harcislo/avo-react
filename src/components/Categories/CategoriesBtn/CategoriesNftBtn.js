import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	setCategoryNft,
	setCurrentPage
} from "../../../redux/actions/galleries.action";

const CategoriesNftBtn = ({ img, id, text }) => {
	const [categoryImg, setCategoryImg] = useState({ default: img || null });
	const categoryNft = useSelector((state) => state.galleries.categoryNft);
	const dispatch = useDispatch();
	useEffect(() => {
		(async function importImage() {
			setCategoryImg(await import(`../../../images/categories_img-${id}.svg`));
		})();
	}, []);

	return (
		<li
			className="categories__item"
			onClick={() => {
				dispatch(setCategoryNft(id));
				dispatch(setCurrentPage(1));
			}}
		>
			<span className={`categories__btn ${categoryNft === id ? "active" : ""} `}>
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

export default CategoriesNftBtn;
