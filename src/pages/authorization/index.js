import React, { useEffect, useState } from "react";
import foxImg from "../registration/steps/images/fox.png";
import bigAvo from "../registration/steps/images/big_avo.png";
import { Button, Col, Divider, Form, Input, message, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, navigate } from "gatsby";
import { Base64 } from "js-base64";
import { setErrorMessage, setLogin } from "../../redux/actions/authorization.action";
import { setUserId, setUserName, setWalletId } from "../../redux/actions/user.action";
import { setPassphraseForExistingUser } from "../../utils/services/user-api.service";
import { AuthorizationService } from "../../utils/services/authorization.service";
import { ArrowLeftOutlined } from "@ant-design/icons";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";
import { setStep } from "../../redux/actions/registration.ation";
import MnemonicGrid from "../../components/MnemonicGrid/MnemonicGrid";
import TelegramLoginButton from "react-telegram-login";
import { apiUrls, botName } from "../../constants";
import UnhandledError from "../../components/UnhandledError/UnhandledError";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MetamaskLogin } from "metamask-node-auth";
import axios from "axios";

const Authorization = () => {
	const dispatch = useDispatch();

	const previousUrl = useSelector((state) => state.url.previousUrl);
	const errorMessage = useSelector((state) => state.authorization.errorMessage);

	const [error, setError] = useState(false);
	const [authStep, setAuthStep] = useState(0);
	const [secretPhrase, setSecretPhrase] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [telegramUserId, setTelegramUserId] = useState(null);
	const [mnemonic, setMnemonic] = useState(null);

	useEffect(() => {
		dispatch(setErrorMessage(null));
	}, []); // eslint-disable-line

	const setPassphrase = async () => {
		try {
			setIsLoading(true);
			const res = await setPassphraseForExistingUser({ user_id: telegramUserId });
			setMnemonic(res?.data?.passphrase?.split(" "));
			setIsLoading(false);
			setAuthStep(3);
		} catch (err) {
			if (+err?.response?.status === 400) {
				setIsLoading(false);
				return message.warning("У вас уже есть секретная фраза");
			}
			console.error(err);
			setError(true);
		}
	};

	const loginPhraseHandler = async (phrase) => {
		setIsLoading(true);
		await dispatch(AuthorizationService.authorizationPhrase(phrase, previousUrl));
		setIsLoading(false);
	};

	const handleTelegramResponse = async ({ id }) => {
		try {
			setTelegramUserId(id);
		} catch (e) {
			//ignore
		}
	};

	const metamaskHandler = async () => {
		try {
			await MetamaskLogin.connectWallet();
			const wallet = MetamaskLogin.wallet;

			const res = await axios.get(`${apiUrls.apiUsers}/api/user/authorization/msg-to-sign`, {
				params: { wallet: wallet },
			});

			const signature = await MetamaskLogin.signMessage(res.data?.messageToSign);

			const authRes = await axios.post(`${apiUrls.apiUsers}/api/user/authorization/by-wallet`, {
				wallet,
				signature,
			});

			dispatch(setLogin(true));
			dispatch(setUserId(authRes.data.user.id));
			dispatch(setUserName(authRes.data.user.username));
			dispatch(setWalletId(authRes.data.user.wallet_id));

			AuthorizationService.saveAccessToken(authRes.data.token);

			await navigate(`/user`);
		} catch (err) {
			if (err?.code === 4001) {
				return message.warning("Запрос на подлючение отклонён");
			}
			message.error("Ошибка авторизации");
			console.error(err);
		}
	};

	return (
		<div>
			<BreadCrumbs />

			{!error && authStep === 0 && (
				<Row style={{ margin: 15 }} justify="center" className="registration-one">
					<Col className="registration__item">
						<img src={foxImg} alt="" className="registration__img" />

						<Button onClick={() => metamaskHandler()} size="large" type="primary">
							С METAMASK
						</Button>
					</Col>

					<Col className="registration__item">
						<img src={bigAvo} alt="" className="registration__img" />

						<Button onClick={() => setAuthStep(1)} size="large" type="primary">
							Секретная фраза
						</Button>
					</Col>
				</Row>
			)}

			{!error && authStep === 1 && (
				<>
					<div className="registration_modal">
						<Form className="registration_form">
							<ArrowLeftOutlined
								onClick={() => {
									dispatch(setErrorMessage(null));
									setAuthStep(0);
								}}
								className="registration_prevBtn"
							/>
							<Typography.Title level={2}>Авторизация</Typography.Title>

							<Form.Item name="phrase" className="registration_input">
								<Input
									value={secretPhrase}
									onChange={(e) => {
										setSecretPhrase(e.target.value);
									}}
									type="text"
									placeholder="Секретная фраза"
									allowClear={true}
									size="large"
								/>
							</Form.Item>
							{errorMessage && (
								<div>
									<Typography.Text type="danger">{errorMessage}</Typography.Text>
								</div>
							)}
							<Typography.Text type="secondary">
								Если у вас уже есть аккаунт AvoNFT, зарегистрированный в телеграм боте, то вы можете
								<Typography.Link onClick={() => setAuthStep(2)}>
									&nbsp;сгенерировать секретную фразу для входа
								</Typography.Link>
							</Typography.Text>
						</Form>
						<Row justify="end" className="registration_modal_footer">
							<Button
								loading={isLoading}
								htmlType="submit"
								size="large"
								onClick={async () => {
									loginPhraseHandler(Base64.encode(secretPhrase));
								}}
								type="primary"
							>
								Войти
							</Button>
						</Row>
					</div>
				</>
			)}

			{!error && authStep === 2 && (
				<div className="registration_modal">
					<ArrowLeftOutlined onClick={() => setAuthStep(1)} className="registration_prevBtn" />
					<Typography.Title level={2}>Получение фразы</Typography.Title>
					<Typography.Text>Для генерации фразы необходимо синхронизироватся с telegram</Typography.Text>
					<TelegramLoginButton
						dataOnauth={(response) => handleTelegramResponse(response)}
						botName={botName}
						className="registration-inputs-bot-button"
					></TelegramLoginButton>
					<Row justify="end" className="registration_modal_footer">
						<Button
							loading={isLoading}
							htmlType="submit"
							size="large"
							onClick={setPassphrase}
							type="primary"
							disabled={!telegramUserId}
						>
							Cгенерировать
						</Button>
					</Row>
				</div>
			)}

			{!error && authStep === 3 && (
				<div className="registration_modal">
					<ArrowLeftOutlined onClick={() => setAuthStep(1)} className="registration_prevBtn" />
					<Typography.Title level={2}>Ваша фраза</Typography.Title>
					<Typography.Text>Скопируйте фразу и сохраните ее удобным вам способом</Typography.Text>
					<Divider />
					<MnemonicGrid mnemonic={mnemonic} />
					<Row align={"middle"} justify="space-between" className="registration_modal_footer">
						<CopyToClipboard text={mnemonic?.join(" ")} onCopy={() => message.success("Фраза скопирована")}>
							{/*<img src={files} alt="" /> Скопировать*/}
							<Button size="large"> Скопировать</Button>
						</CopyToClipboard>

						<Button htmlType="submit" size="large" onClick={() => setAuthStep(1)} type="primary">
							Продолжить
						</Button>
					</Row>
				</div>
			)}

			{!error && authStep === 0 && (
				<div className="login__btn">
					<Link onClick={() => dispatch(setStep(0))} to="/registration">
						Регистрация
					</Link>
				</div>
			)}

			{error && <UnhandledError />}
		</div>
	);
};

export default Authorization;
