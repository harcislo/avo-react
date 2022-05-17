import React, { useState } from "react";
import { Menu, Spin } from "antd";
import categoryImg from "../../images/categories_img-10.svg";
import GalleryCategoriesBtn from "../Categories/CategoriesBtn/CategoriesBtn";
import { useDispatch } from "react-redux";
import { setCategoryUserAction } from "../../redux/actions/user.action";

const CategoryUser = () => {
	const dispatch = useDispatch();
	const [currentCategoryName, setCurrentCategoryName] = useState("Все NFT");
	const [pagesLoaded, setPagesLoaded] = useState({
		current: 1,
		prev: 1,
	});

	const setCategoryHandler = (id) => {
		dispatch(setCategoryUserAction(id));
	};

	const categories = [
		{ id: 5, name: "DigitalArt" },
		{ id: 4, name: "Видео" },
		{ id: 10, name: "Другое" },
		{ id: 2, name: "Живопись" },
		{ id: 7, name: "Литература" },
		{ id: 6, name: "Музыка" },
		{ id: 11, name: "Спорт" },
		{ id: 3, name: "Фотография" },
		{ id: 12, name: "Ювелирные изделия" },
	];
	return (
		<div>
			<article className="categories container">
				<h2 className="categories__title">Категории</h2>

				<Menu
					defaultSelectedKeys={["null"]}
					mode="inline"
					className="categories__btn__mobile"
					onSelect={(category) => {
						if (category.key !== "null") {
							const categoryName = categories.find(({ id }) => +id === +category.key).name;
							setCurrentCategoryName(categoryName);
						} else setCurrentCategoryName("Все NFT");
						setCategoryHandler(category.key === "null" ? null : category.key);
					}}
				>
					<Menu.SubMenu
						key="sub1"
						icon={<img src={categoryImg} />}
						title={`Категория: ${currentCategoryName ? currentCategoryName : "Все NFT"}`}
					>
						{categories.map((category) => (
							<Menu.Item key={category.id}>{category.name}</Menu.Item>
						))}
						<Menu.Item key="null">Все NFT</Menu.Item>
					</Menu.SubMenu>
				</Menu>

				<ul className="categories__list">
					{categories.map((category) => {
						return (
							<GalleryCategoriesBtn
								text={category.name}
								id={category.id}
								key={category.id}
								setPagesLoaded={setPagesLoaded}
								setCategory={setCategoryHandler}
								setCategoryHandlerUser={setCategoryHandler}
							/>
						);
					})}
					<GalleryCategoriesBtn text="Все NFT" id={null} img={categoryImg} setPagesLoaded={setPagesLoaded} />
				</ul>
			</article>
		</div>
	);
};

export default CategoryUser;
