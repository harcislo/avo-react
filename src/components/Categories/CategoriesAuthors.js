import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getCategories} from "../../utils/services/categories.service";
import {Divider, Menu, Typography} from "antd";
import categoryImg from "../../images/categories_img-10.svg";
import CategoriesAuthorBtn from "./CategoriesBtn/CategoriesAuthorsBtn";
import {setCategoryAuthors, setCurrentPage} from "../../redux/actions/galleries.action";

const CategoriesNft = () => {
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

	const dispatch = useDispatch();

	const [categories, setCategories] = useState([]);
	const [currentCategoryName, setCurrentCategoryName] = useState("Все NFT");

	useEffect(() => {
		getCategories("authors").then((res) => {
			setCategories(res.data);
		});
	}, []); // eslint-disable-line

	return (
		<article className="categories container">
			<Divider orientation="left" orientationMargin="0">
				<Typography.Title level={2}>Категории</Typography.Title>
			</Divider>

			<Menu
				defaultSelectedKeys={["null"]}
				mode="inline"
				className="categories__btn__mobile"
				onSelect={(category) => {
					if (category.key !== "null") {
						const categoryName = categories.find(({ id }) => +id === +category.key).name;
						setCurrentCategoryName(categoryName);
						dispatch(setCategoryAuthors(+category.key));
						dispatch(setCurrentPage(1));
					} else {
						setCurrentCategoryName("Все NFT");
						dispatch(setCategoryAuthors(+category.key));
						dispatch(setCurrentPage(1));
					}
					setCategoryAuthors(category.key === "null" ? null : category.key);
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
						<CategoriesAuthorBtn
							text={category.name}
							id={category.id}
							key={category.id}
							authorImages={resAuthorImg.arr}
							authorIndex={i}
						/>
					);
				})}
				<CategoriesAuthorBtn text="Все NFT" id={null} img={categoryImg} />
			</ul>
		</article>
	);
};

export default CategoriesNft;
