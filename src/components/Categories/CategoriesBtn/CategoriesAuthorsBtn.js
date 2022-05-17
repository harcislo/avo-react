import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAuthors, setCurrentPage } from "../../../redux/actions/galleries.action";

const CategoriesAuthorBtn = ({ img, id, text, authorImages, authorIndex }) => {
	const [categoryImg, setCategoryImg] = useState({ default: img || null });
	const categoryAuthors = useSelector((state) => state.galleries.categoryAuthors);
	const dispatch = useDispatch();
	useEffect(() => {
		(async function importImage() {
			authorImages &&
				setCategoryImg(await import(`../../../images/categories_img-${authorImages[authorIndex]}.svg`));
		})();
	}, []);

	return (
		<li
			className="categories__item"
			onClick={() => {
				dispatch(setCategoryAuthors(id));
				dispatch(setCurrentPage(1));
			}}
		>
			<span className={`categories__btn ${categoryAuthors === id ? "active" : ""} `}>
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

export default CategoriesAuthorBtn;
