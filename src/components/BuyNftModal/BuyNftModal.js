import React, {useState} from "react";
import queryString from "query-string";
import "./BuyNftModal.scss";
import {
	Modal,
	Button,
	Form,
	Space,
	Image,
	Typography,
	InputNumber,
	Row,
	Col,
	Divider,
	Result,
	message,
	Tooltip,
} from "antd";
import {Link} from "gatsby";
import AvoIcon from "../icons/AvoIcon";
import {getNft, getUser, makePurchase} from "../../utils/services/user-api.service";
import {makeNftImageSrc} from "../../utils/nft.utils";
import {connect, useDispatch} from "react-redux";
import {setUserGalleryType, setNfts} from "../../redux/actions/user.action";
import UnhandledError from "../UnhandledError/UnhandledError";

const BuyNftModal = ({isModalVisible, nft, userId, setIsModalVisible, setCurrentNft, setNfts}) => {
	const [amountToBuy, setAmountToBuy] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const dispatch = useDispatch();

	function onClose() {
		setSuccess(false);
		setError(false);
		setLoading(false);
		setIsModalVisible(false);
		setAmountToBuy(1);
	}

	async function purchaseNft() {
		try {
			setLoading(true);

			await makePurchase({
				userId,
				nftId: nft.id,
				count: amountToBuy,
			});
			const query = queryString.parse(window.location.search);
			const res = await getNft({id: query.id});
			setCurrentNft(res.data);
			const user = await getUser();
			setNfts(user.data.nfts);
			setLoading(false);
			setSuccess(true);

		} catch (err) {
			const data = err.response?.data;
			if (data?.details?.type === "INSUFFICIENT_FUNDS") {
				return message.warning("Недостаточно средств для покупки");
			}
			setError(true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Modal
			title="Покупка NFT"
			visible={isModalVisible}
			onCancel={onClose}
			footer={
				<Row justify="center">
					{error || success ? (
						<Button type={"primary"} htmlType="submit" onClick={onClose} size="large">
							Закрыть
						</Button>
					) : (
						<Button type={"primary"} htmlType="submit" onClick={purchaseNft} size="large" loading={loading}>
							Купить
						</Button>
					)}
				</Row>}
		>
			{error ? (
				<UnhandledError />
			) : success ? (
				<Result
					status="success"
					title={`Успешная покупка NFT ${nft.title}`}
					subTitle={`Лицензия: ${nft.license || "без лицензии"}. Количество: ${amountToBuy}.`}
					extra={
						<Link to="/user">
							<Button onClick={() => dispatch(setUserGalleryType("onPlatform"))} type="link">
								Мои нфт
							</Button>
						</Link>
					}
				/>
			) : (
				<>
					<Form layout="vertical" autoComplete="off" initialValues={{amountToBuy}}>
						<Row gutter={12} align="top" justify="space-between" wrap={false}>
							<Col>
								<Image width={90} src={makeNftImageSrc(nft)} preview={false} />
							</Col>
							<Col flex={2}>
								<Typography.Text strong>{nft.title}</Typography.Text>
							</Col>
							<Col>
								<Form.Item name="amountToBuy" label="Количество:">
									<InputNumber
										onChange={(amount) => setAmountToBuy(amount)}
										min={1}
										max={nft.available}
									/>
								</Form.Item>
							</Col>
							<Col offset={1} className="nft-buy-price">
								<Form.Item name="price" label="Цена:">
									<Space size={2} align="start">
										<AvoIcon size="small" />
										<Tooltip placement="topRight" title={`≈ ${nft.price.rub}₽`}>
											<Typography.Text strong>{nft.price.avo}</Typography.Text>
										</Tooltip>
									</Space>
								</Form.Item>
							</Col>
						</Row>
					</Form>
					<Divider />
					<Row justify="space-between">
						<Col>
							<Typography.Text strong className="text-lg">
								Всего
							</Typography.Text>
						</Col>
						<Col>
							<Space direction="vertical" size={0}>
								<Space align="center">
									<AvoIcon />
									<Tooltip placement="topRight" title={`≈ ${nft.price.rub * amountToBuy}₽`}>
										<Typography.Text strong className="text-lg">
											{nft.price.avo * amountToBuy}
										</Typography.Text>
									</Tooltip>
								</Space>
								<Typography.Text
									style={{
										fontSize: 12,
									}}
									type="secondary"
									strong
								>
									≈ {nft.price.rub * amountToBuy}₽
								</Typography.Text>
							</Space>

						</Col>


					</Row>
				</>
			)}
		</Modal>
	);
};

const mdtp = (dispatch) => ({
	setNfts: (nfts) => dispatch(setNfts(nfts)),
});

export default connect(null, mdtp)(BuyNftModal);
