import React, {useEffect, useState} from "react";
import queryString from "query-string";
import amountImg from "../../images/nft.svg";
import qrImg from "../../images/qr.png";
import "./nft.scss";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";
import {Link} from "gatsby";
import WorkDescription from "../../components/WorkDescription/WorkDescription";
import NftView from "../../components/gallery/NftView/NftView";
import {Button, message, Space, Typography} from "antd";
import BuyNftModal from "../../components/BuyNftModal/BuyNftModal";
import AvoIcon from "../../components/icons/AvoIcon";
import {connect} from "react-redux";
import {getNft} from "../../utils/services/gallery.service";

const NftPage = ({isAuth, userId, userNfts, author}) => {
	const [nft, setNft] = useState(null);
	const [nftAmount, setNftAmount] = useState(0);
	useEffect(() => {
		(async function getData() {
			const query = queryString.parse(window.location.search);
			const res = await getNft({id: query.id, isAuth});
			setNft(res.data);
		})();
	}, []); // eslint-disable-line
	useEffect(() => {
		if (nft && userNfts) {
			const nftAmount = nft && userNfts.find(userNft => nft.id === userNft.id)?.nftAmount;
			setNftAmount(nftAmount || 0);
		} else {
			setNftAmount(0);
		}
	}, [userNfts, nft]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	return (
		nft && (
			<>
				<BreadCrumbs />
				<article className="work  nftInfo container">
					<div className="work__wrap">
						<div className="work__content">
							{author?.id === nft.author_id &&
								<div className={ `gallery-nft-status ${nft.status === 'moderation' ? 'gallery-card-nft-status-moderation' : 'gallery-card-nft-status-active'}`}>
									{nft.status === 'moderation' ? "В модерации" : "Активно"}
								</div>
							}
							<h1 className="work__title">
								{nft.title}
								<span className="work__id">
									<span>ID</span> {nft.id}
								</span>

							</h1>
							<div className="work__descriptions">
								{nft.description ? <WorkDescription text={nft.description} /> : ""}
								<div className="work__token">
									<Typography.Link
										href="https://bscscan.com/address/0x721B6EF510fA0C6EecD4BaB055724B0CA6478503"
										target="_blank"
										className="work__token-content"
										ellipsis
									>
										Smart-contract: 0x721B6EF510fA0C6EecD4BaB055724B0CA6478503
									</Typography.Link>

									{nft.qr_code_url && (
										<div className="work__qr">
											<a href={nft.qr_code_url} target="_blank" rel="noreferrer">
												<img src={qrImg} alt="" />
											</a>
										</div>
									)}
								</div>
							</div>

							<div className="work__author-caption work__caption">Автор</div>
							<div className="work__author">
								<div
									style={{backgroundImage: `url("${nft.author && nft.author.img}")`}}
									className="work__author-img"
								/>
								<div className="work__author-content">
									<div className="work__author-name">{nft.author && nft.author.name}</div>
									<Link to={`/authors/author?id=${nft.author_id}`} className="work__all-works">
										Посмотреть все работы
									</Link>
								</div>
							</div>
							<div className="work__check">
								<img src={amountImg} alt="" /> Доступно к покупке:&nbsp;
								<span>
									{nft.available}/{nft.emission}
								</span>
							</div>
							{nftAmount ? <div className="work__check">
								У вас на балансе: {nftAmount}
							</div> : null}
							<div className="work__by">
								<Space wrap size={15}>
									<AvoIcon size="large" />
									<Typography.Text strong className="price__avo text-xxl">
										{nft.price.avo} avo
									</Typography.Text>
									<Typography.Text
										className="price__rub"
										type="secondary"
										strong
									>
										{nft.price.rub}₽
									</Typography.Text>
								</Space>

								<Button
									disabled={nft.available === 0 || nft.status === 'moderation'}
									type="primary"
									onClick={() =>
										isAuth
											? setIsModalVisible(true)
											: message.warning("Для покупки необходимо авторизоватся")
									}
									size="large"
								>
									Купить
								</Button>



								<BuyNftModal
									nft={nft}
									userId={userId}
									isModalVisible={isModalVisible}
									setIsModalVisible={setIsModalVisible}
									setCurrentNft={setNft}
								/>
							</div>
						</div>
						<div className="work__block">
							<h1 className="work__title mobile">
								{nft.title}
								<span className="work__id">
									<span>ID</span> {nft.id}
								</span>
							</h1>
							{nft.id ? <NftView nft={nft} /> : ""}
						</div>
					</div>
				</article>
			</>
		)
	);
};

const mstp = ({authorization, user}) => ({
	isAuth: authorization.isAuth,
	userId: user.userId,
	userNfts: user.nfts,
	author: user.author
});

export default connect(mstp)(NftPage);
