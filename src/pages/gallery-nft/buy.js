import React, { useEffect, useState } from "react";
import "./buy.scss";
import queryString from "query-string";
import { Button, Form, Input, message, Typography } from "antd";
import { Link } from "gatsby";
import NftView from "../../components/gallery/NftView/NftView";
import avoImg from "../../images/avo.svg";
import BreadCrumbsItem from "../../components/BreadCrumbs/BreadCrumbsItem/BreadCrumbsItem";
import {getNft} from "../../utils/services/gallery.service";

const { Title } = Typography;

const Buy = () => {
	let query;
	let nftId;

	const [amount, setAmount] = useState(null);
	const [nft, setNft] = useState(null);
	const [nftTitle, setNftTitle] = useState(null);
	const [nftAvailable, setNftAvailable] = useState(null);
	const [authorName, setAuthorName] = useState(null);
	const [license, setLicense] = useState(null);
	const [nftPrice, setNftPrice] = useState(null);

	const buyHandler = async () => {
		if (amount > nftAvailable) {
			await message.warning(`Всего доступно ${nftAvailable} NFT`);
		}
	};

	useEffect(() => {
		query = queryString.parse(window.location.search); //eslint-disable-line
		nftId = query.id; //eslint-disable-line
		getNft({ id: nftId }).then((res) => {
			setNft(res.data);
			setNftTitle(res.data.title);
			setAuthorName(res.data.author.name);
			setLicense(res.data.license);
			setNftPrice(res.data.price.avo);
			setNftAvailable(res.data.available);
		});
	}, [nftId]);

	return (
		<>
			<div className="bread-crumbs container">
				<img src={avoImg} alt="" />
				<ul className="bread-crumbs__list">
					<BreadCrumbsItem text="Главная" to="/" />
					<BreadCrumbsItem text="Галерея NFT" to="/gallery-nft" />
					<BreadCrumbsItem text="NFT" to={`/gallery-nft/nft?id=${nftId}`} />
					<BreadCrumbsItem text="Купить NFT" to={`/gallery-nft/buy?id=${nftId}`} />
				</ul>
			</div>

			<div className="by-nft_wrapper">
				<Form>
					<div className="by-nft_wrapper_form">
						<div className="by-nft_title">
							<Title level={2}>Покупка NFT</Title>
						</div>

						<div className="by-nft_amount">
							<Form.Item
								required={false}
								colon={false}
								label="Количество"
								name="amount"
								rules={[
									{ required: true, message: "Поле обязательно для заполнения" },
									{ type: "string", message: `Введите число` },
								]}
								// valuePropName={amount}
							>
								<Input
									type="number"
									value={amount}
									onChange={(e) => {
										if (e.currentTarget.value.length < 6) {
											setAmount(e.currentTarget.value);
										}
									}}
								/>
							</Form.Item>
						</div>

						<div className="by-nft_item">
							<span>Название</span>
							<Link to={"/"}>{nftTitle ? nftTitle : ""}</Link>
						</div>

						<div className="by-nft_item">
							<span>Автор</span>

							<Link to={"/"}>{authorName ? authorName : ""}</Link>
						</div>

						<div className="by-nft_item">
							<span>Лицензия</span>

							<Link to={"/"}>{license ? license : "Нет лицензии"}</Link>
						</div>

						<div className="by-nft_item">
							<span>Сумма</span>

							<Link to={"/"}>{nftPrice ? nftPrice * amount : ""} AVO NFT</Link>
						</div>

						<div className="by-nft_btn">
							<Button htmlType="submit" onClick={buyHandler} type={"primary"}>
								Купить
							</Button>
						</div>
					</div>
				</Form>

				<div className="by-nft_wrapper_img">
					<div className="by-nft_img">{nft && <NftView nft={nft} />}</div>
				</div>
			</div>
		</>
	);
};

export default Buy;
