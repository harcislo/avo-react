import React, {useEffect, useState} from "react";
import GalleryCategoriesBtn from "./CategoriesBtn/CategoriesBtn";
import categoryImg from "../../images/categories_img-10.svg";
import {useDispatch} from "react-redux";
import {setCategory} from "../../redux/actions/gallery.action";
import {Menu} from "antd";

import "./categories.scss";
import {setCategoryUserAction} from "../../redux/actions/user.action";
import {getCategories} from "../../utils/services/categories.service";

function Categories({ type = "nft", setPagesLoaded, title }) {
	const dispatch = useDispatch();
	//Заглушка, для работы с категориями галереи авторов
	const resAuthorImg = {
		arr: [10, 8, 5, 4, 6, 7, 11, 9, 3],
		data: [
			{ id: 10, name: "DigitalArtist" },
			{ id: 8, name: "Другое" },
			{ id: 5, name: "Исполнитель" },
			{ id: 4, name: "Композитор" },
			{ id: 6, name: "Музыкант" },
			{ id: 7, name: "Писатель" },
			{ id: 11, name: "Правообладатель" },
			{ id: 9, name: "Ребёнок" },
			{ id: 3, name: "Фотограф" },
		],
	};

	const [categories, setCategories] = useState([]);
	const [currentCategoryName, setCurrentCategoryName] = useState("Все NFT");

	useEffect(() => {
		(async function () {
			const { data } = await getCategories( type );
			setCategories(data);
		})();
		dispatch(setCategory(null));
		dispatch(setCategoryUserAction(null));
		setCurrentCategoryName("Все NFT");
		return () => {
			setCategory(null);
		};
	}, []); // eslint-disable-line

	return (
		<article className="categories container">
			<h2 className="categories__title">{title || "Категории"}</h2>

			<Menu
				defaultSelectedKeys={["null"]}
				mode="inline"
				className="categories__btn__mobile"
				onSelect={(category) => {
					if (category.key !== "null") {
						const categoryName = categories.find(({ id }) => +id === +category.key).name;
						setCurrentCategoryName(categoryName);
						dispatch(setCategory(+category.key));
						setPagesLoaded({ current: 1, prev: 1 });
						dispatch(setCategoryUserAction(+category.key));
					} else {
						dispatch(setCategory(+category.key));
						setPagesLoaded({ current: 1, prev: 1 });
						dispatch(setCategoryUserAction(+category.key));
						setCurrentCategoryName("Все NFT");
					}

					setCategory(category.key === "null" ? null : category.key);
				}}
			>
				<Menu.SubMenu
					key="sub1"
					icon={<img alt={"categoryImg"} src={categoryImg} />}
					title={`Категория: ${currentCategoryName ? currentCategoryName : "Все NFT"}`}
				>
					{categories.map((category) => {
						return <Menu.Item key={category.id}>{category.name}</Menu.Item>;
					})}
					<Menu.Item key="null">Все NFT</Menu.Item>
				</Menu.SubMenu>
			</Menu>

			<ul className="categories__list">
				{categories.map((category, i) => {
					return (
						<GalleryCategoriesBtn
							text={category.name}
							id={category.id}
							key={category.id}
							setPagesLoaded={setPagesLoaded}
							type={type}
							//Заглущки для работы с категориями галереи авторов
							authorImgIds={resAuthorImg.arr}
							authorIndex={i}
						/>
					);
				})}
				<GalleryCategoriesBtn text="Все NFT" id={null} img={categoryImg} setPagesLoaded={setPagesLoaded} />
			</ul>
		</article>
	);
}

export default Categories;
