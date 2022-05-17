import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../utils/services/categories.service";
import { Divider, Menu, Typography } from "antd";
import categoryImg from "../../images/categories_img-10.svg";
import CategoriesAuthorNftBtn from "./CategoriesBtn/CategoriesAuthorNft";
import { setCategoryAuthorNft, setCurrentPage } from "../../redux/actions/galleries.action";

const CategoriesAuthorNft = () => {
	const dispatch = useDispatch();

	const [categories, setCategories] = useState([]);
	const [currentCategoryName, setCurrentCategoryName] = useState("Все NFT");

	useEffect(() => {
		getCategories("nft").then((res) => {
			setCategories(res.data);
		});
	}, []);

	return (
		<article className="categories container">
			<Divider orientation="left" orientationMargin="0">
				<Typography.Title level={2}>Работы автора</Typography.Title>
			</Divider>

			<Menu
				defaultSelectedKeys={["null"]}
				mode="inline"
				className="categories__btn__mobile"
				onSelect={(category) => {
					if (category.key !== "null") {
						const categoryName = categories.find(({ id }) => +id === +category.key).name;
						setCurrentCategoryName(categoryName);
						dispatch(setCategoryAuthorNft(+category.key));
						dispatch(setCurrentPage(1));
					} else {
						setCurrentCategoryName("Все NFT");
						dispatch(setCategoryAuthorNft(+category.key));
						dispatch(setCurrentPage(1));
					}
					setCategoryAuthorNft(category.key === "null" ? null : category.key);
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
					return <CategoriesAuthorNftBtn text={category.name} id={category.id} key={category.id} />;
				})}
				<CategoriesAuthorNftBtn text="Все NFT" id={null} img={categoryImg} />
			</ul>
		</article>
	);
};

export default CategoriesAuthorNft;
