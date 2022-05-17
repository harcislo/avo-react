import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCategory } from "../../../redux/actions/gallery.action";
import "./CategoriesBtn.scss";
import { setCategoryUserAction } from "../../../redux/actions/user.action";

const CategoriesBtn = ({
	text,
	id,
	img,
	setCategory,
	category,
	setPagesLoaded,
	setCategoryUser,
	type,
	authorImgIds,
	authorIndex,
}) => {
	const [categoryImg, setCategoryImg] = useState({ default: img || null });
	useEffect(() => {
		(async function importImage() {
			//Если type === 'authors', то картинку достаём из заглушек
			if (type === "authors") {
				setCategoryImg(await import(`../../../images/categories_img-${authorImgIds[authorIndex]}.svg`));
			} else {
				setCategoryImg(await import(`../../../images/categories_img-${id}.svg`));
			}
		})();
	}, []); // eslint-disable-line

	return (
		<button
			className="categories__item"
			onClick={() => {
				setCategory(id);
				setPagesLoaded({ current: 1, prev: 1 });
				setCategoryUser(id);
			}}
		>
			<span className={`categories__btn ${category === id ? "active" : ""} `}>
				{categoryImg.default ? (
					<img alt="categories_img" src={categoryImg.default} className="categories__img" />
				) : (
					<Spin className="categories__img loader" />
				)}
				{text}
			</span>
		</button>
	);
};

const mstp = ({ gallery }) => ({
	category: gallery.category.current,
});
const mdtp = (dispatch) => ({
	setCategory: (categoryId) => dispatch(setCategory(categoryId)),
	setCategoryUser: (categoryId) => dispatch(setCategoryUserAction(categoryId)),
});

export default connect(mstp, mdtp)(CategoriesBtn);
