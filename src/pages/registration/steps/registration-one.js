import { Button, Form, Input, message, Row, Typography } from "antd";
import { Link, navigate } from "gatsby";
import React from "react";
import { connect } from "react-redux";
import TelegramLoginButton from "react-telegram-login";
import { resetSettings, setStep, setTelegramUserId, setUserName } from "../../../redux/actions/registration.ation";
import {
	checkSignupPossibility,
	getMsgToSignRegistration,
	registerUserByMetamask,
} from "../../../utils/services/user-api.service";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { botName } from "../../../constants";
import { MetamaskLogin } from "metamask-node-auth";

const mstp = ({ registration }) => ({
	telegramUserId: registration.telegramUserId,
	wallet: registration.wallet,
	username: registration.username,
});

const mdtp = (dispatch) => ({
	resetSettings: () => dispatch(resetSettings()),
	setStep: (step) => dispatch(setStep(step)),
	setUserName: (username) => dispatch(setUserName(username)),
	setTelegramUserId: (telegramUserId) => dispatch(setTelegramUserId(telegramUserId)),
});

const RegistrationOne = ({ resetSettings, setStep, setUserName, setTelegramUserId, telegramUserId, wallet }) => {
	const [login, setLogin] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState(null);
	const handleTelegramResponse = ({ id }) => {
		try {
			setTelegramUserId(id);
		} catch (e) {
			//ignore
		}
	};

	const nextStep = async () => {
		if (login.replace(/\s+/g, " ").trim().split(" ").length > 1) {
			return setErrorMessage("Логин должен состоять из одного слова");
		}
		setUserName(login);

		if (!telegramUserId) {
			return setErrorMessage("Необходимо авторизироваться через Telegram");
		}
		setErrorMessage(null);

		try {
			await checkSignupPossibility({ userId: telegramUserId, username: login });
		} catch (err) {
			if (err.response?.data?.details?.type === "EXIST_BY_USERNAME") {
				return setErrorMessage("Пользователь с таким логином уже существует");
			}
			if (err.response?.data?.details?.type === "EXIST_BY_USER_ID") {
				return setErrorMessage(
					<>
						У вас уже есть аккаунт, пожалуйста{" "}
						<Link to="/authorization" style={{ textDecoration: "underline", color: "inherit" }}>
							авторизуйтесь
						</Link>
					</>
				);
			}
			console.log(err);
			return setErrorMessage(err.response?.data?.message || err.message);
		}

		// when registering using metamask
		if (wallet) {
			try {
				const res = await getMsgToSignRegistration();

				const signature = await MetamaskLogin.signMessage(res.data.messageToSign);

				await registerUserByMetamask({
					wallet: MetamaskLogin.wallet,
					signature,
					username: login,
					user_id: telegramUserId,
				});

				await navigate(`/authorization`);

				navigate("/gallery-nft/");
				message.success("Ваш аккаунт успешно создан");
				resetSettings();
			} catch (err) {
				if (err?.code === 4001) {
					return message.warning("Запрос отклонён");
				}
				message.error("Ошибка при регистрации");
				console.error(err);
			}
		} else {
			setStep(2);
		}
	};

	return (
		<>
			<div className="registration_modal">
				<Form onFinish={nextStep} className="registration_form" layout="vertical">
					<ArrowLeftOutlined onClick={() => setStep(0)} className="registration_prevBtn" />
					<Typography.Title level={2}>Регистрация</Typography.Title>
					<Form.Item
						name="login"
						className="registration_input"
						rules={[{ required: true, message: "Логин является обязательным полем" }]}
					>
						<Input
							maxLength={100}
							value={login}
							onChange={(e) => {
								setLogin(e.target.value);
							}}
							type="text"
							placeholder="Логин"
							allowClear={true}
							size="large"
						/>
					</Form.Item>

					<Typography.Text type="secondary">
						Для завершения регистрации необходима синхронизация с telegram
					</Typography.Text>
					<TelegramLoginButton
						dataOnauth={(response) => handleTelegramResponse(response)}
						botName={botName}
						className="registration-inputs-bot-button"
					></TelegramLoginButton>

					<Typography.Text type="danger">{errorMessage}</Typography.Text>

					<Row justify="end" className="registration_modal_footer">
						<Button htmlType="submit" size="large" type="primary">
							Далее
						</Button>
					</Row>
				</Form>
			</div>
		</>
	);
};

export default connect(mstp, mdtp)(RegistrationOne);
