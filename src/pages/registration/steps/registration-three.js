import React, { useState } from "react";
import chat from "./images/chat.png";
import { connect, useDispatch } from "react-redux";
import { Button, Col, Divider, Form, message, Row, Space, Typography } from "antd";
import { registerUser } from "../../../utils/services/user-api.service";
import { navigate } from "gatsby";
import { resetSettings, setStep } from "../../../redux/actions/registration.ation";
import { AuthorizationService } from "../../../utils/services/authorization.service";
import { Base64 } from "js-base64";

const mstp = ({ registration }) => ({
	mnemonic: registration.mnemonic,
	user_id: registration.telegramUserId,
	username: registration.username,
});

const mdtp = (dispatch) => ({
	resetSettings: () => dispatch(resetSettings()),
	setStep: (step) => dispatch(setStep(step)),
});
const RegistrationThree = ({ resetSettings, mnemonic, user_id, username, setStep }) => {
	let mnemonicObjects = [];
	mnemonic && mnemonic?.map((el, i) => mnemonicObjects.push({ id: i, title: el }));

	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [shuffledMnemonic, setShuffledMnemonic] = useState(
		mnemonic ? mnemonicObjects?.sort(() => Math.random() - 0.5) : []
	);
	const [checkedMnemonic, setCheckedMnemonic] = useState([]);
	const updateMnemonic = (word) => {
		setCheckedMnemonic(checkedMnemonic?.concat(word));
		setShuffledMnemonic(shuffledMnemonic.filter((w) => w.id !== word.id));
	};

	const restoreWord = (word) => {
		setCheckedMnemonic(checkedMnemonic.filter((w) => w.id !== word.id));
		setShuffledMnemonic(shuffledMnemonic.concat(word));
	};

	const finishSignup = async () => {
		const isValidPasshprase = mnemonic.every((checkedWord, index) => {
			return checkedWord === checkedMnemonic[index].title;
		});

		if (isValidPasshprase) {
			try {
				setIsLoading(true);
				await registerUser({
					user_id,
					username,
					passphrase: mnemonic.join(" "),
				}).then(() => dispatch(AuthorizationService.authorizationPhrase(Base64.encode(mnemonic.join(" ")))));
				resetSettings();
				setIsLoading(false);
				navigate("/gallery-nft/");
				message.success("Ваш аккаунт успешно создан");
			} catch (err) {
				setIsLoading(false);
				console.log(err);
				message.error("Ошибка при создании пользователя");
			}
		} else {
			message.error("Фразы не совпадают");
		}
	};

	return (
		<>
			<div className="registration_modal">
				<Form className="registration_form">
					<Typography.Title level={2}>Подтвердите фразу</Typography.Title>
					<Typography.Text>Подтвердите фразу, чтобы убедиться что она верна</Typography.Text>

					<Divider />

					<Row justify="center">
						{checkedMnemonic.length ? (
							<Row gutter={[8, 8]}>
								{checkedMnemonic?.map((word, key) => (
									<Button
										style={{ color: "#262626", margin: 5 }}
										type="dashed"
										key={key}
										onClick={() => restoreWord(word)}
									>
										{word.title}
									</Button>
								))}
							</Row>
						) : (
							<Row justify="center">
								<Space align="center" direction="vertical">
									<img src={chat} alt="" />
									<Col>Вы не ввели ни одного слова</Col>
								</Space>
							</Row>
						)}
					</Row>
					<Divider />

					<Row gutter={[8, 8]}>
						{shuffledMnemonic?.map((word, key) => (
							<Col
								xs={{ span: 12 }}
								sm={{ span: 8 }}
								md={{ span: 6 }}
								key={key}
								onClick={() => updateMnemonic(word)}
							>
								<Button
									style={{ width: 100, color: "#262626" }}
									type="dashed"
									onClick={() => updateMnemonic(word)}
								>
									{word.title}
								</Button>
							</Col>
						))}
					</Row>

					<Row justify="end" className="registration_modal_footer">
						<Button
							loading={isLoading}
							htmlType="submit"
							size="large"
							onClick={finishSignup}
							type="primary"
						>
							Подтвердить
						</Button>
					</Row>
				</Form>
			</div>
		</>
	);
};

export default connect(mstp, mdtp)(RegistrationThree);
