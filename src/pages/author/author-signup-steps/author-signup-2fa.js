import React, {useEffect} from "react";
import {Button, Col, Form, Input, message, Row, Typography} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {
	setCurrentStep,
} from "../../../redux/actions/author-registration.action";
import {getUserAuthor, registerAuthor, send2faEmailCode, send2faMobileCode} from "../../../utils/services/user-api.service";
import {connect} from "react-redux";
import {navigate} from "gatsby";
import {setUserGalleryType, setUserInfo} from "../../../redux/actions/user.action";


const AuthorSignUp2fa = ({
	email,
	phoneNumber,
	username,
	description,
	categoryId,
	wallet,
	royalty,
	setCurrentStep,
	setUserGalleryType,
	authorPhotoUrl,
	passportFile,
	setUserInfo
}) => {

	const [emailVerificationCode, setEmailVerificationCode] = React.useState(null);
	const [emailVerificationToken, setEmailVerificationToken] = React.useState(null);
	const [phoneVerificationCode, setPhoneVerificationCode] = React.useState(null);
	const [phoneVerificationToken, setPhoneVerificationToken] = React.useState(null);

	const [isEmailVerificationLoading, setEmailVerificationLoading] = React.useState(false);
	const [isPhoneVerificationLoading, setPhoneVerificationLoading] = React.useState(false);
	const isFieldsFilled = phoneVerificationCode && emailVerificationCode;

	useEffect(() => {
		return async () => {
			try {
				const authorResponse = await getUserAuthor();
				setUserInfo({author: authorResponse.data});
			} catch (err) {
				if (err.response?.status === 404) {
					setUserInfo({author: null});
				} else {
					throw err;
				}
			}
		}
	}, [setUserInfo]);

	const submit = async () => {
		try {
			await registerAuthor({
				email,
				phoneNumber,
				username,
				description,
				categoryId,
				wallet,
				royalty,
				emailVerificationCode,
				emailVerificationToken,
				phoneVerificationCode,
				phoneVerificationToken,
				authorPhotoUrl,
				passportFile,
			});
			message.success("Регистрация автора прошла успешно");
			navigate("/user");
			setUserGalleryType("onCreated");
		} catch (err) {
			message.error(err.response?.data?.message || err.message || err);
		}
	};

	const sendEmailVerificationCode = async () => {
		try {
			setEmailVerificationLoading(true);
			setTimeout(() => setEmailVerificationLoading(false), 30 * 1000);
			const response = await send2faEmailCode(email);
			setEmailVerificationToken(response.data.token);
			message.success('Код успешно отправлен');
		} catch (err) {
			message.error(err.response?.data?.message || err.message || err);
		}
	}

	const sendPhoneVerificationCode = async () => {
		try {
			setPhoneVerificationLoading(true);
			setTimeout(() => setPhoneVerificationLoading(false), 30 * 1000);
			const response = await send2faMobileCode(phoneNumber);
			setPhoneVerificationToken(response.data.token);
			message.success('Код успешно отправлен');
		} catch (err) {
			message.error(err.response?.data?.message || err.message || err);
		}
	}

	return (
		<div>
			<div className="registration_modal author-signup-2fa">
				<Form
					onFinish={submit}
					className="registration_form"
					layout="vertical">
					<ArrowLeftOutlined
						onClick={() => setCurrentStep(2)}
						className="registration_prevBtn" />
					<Typography.Title level={2}>Верификация</Typography.Title>

					<Row
						justify="end"
						className="registration_modal_footer">
						<Col xs={24}>
							<Form.Item
								name='emailVerificationCode'

								label="Код верификации (email)">
								<Input.Group size="large" >
									<Input
										size="large"
										style={{width: 'calc(100% - 143px)'}}
										onChange={(e) => setEmailVerificationCode(e.target.value)} />
									<Button
										disabled={isEmailVerificationLoading}
										onClick={sendEmailVerificationCode}
										className="author-signup-2fa-group-button"
										size="large"
										type="primary">
										Отправить код
									</Button>
								</Input.Group>
							</Form.Item>
						</Col>
						<Col xs={24}>
							<Form.Item
								name='phoneVerificationCode'
								label="Код верификации (телефон)">
								<Input.Group size="large">
									<Input
										onChange={(e) => setPhoneVerificationCode(e.target.value)}
										size="large"
										style={{width: 'calc(100% - 143px)'}} />
									<Button
										disabled={isPhoneVerificationLoading}
										onClick={sendPhoneVerificationCode}
										className="author-signup-2fa-group-button"
										size="large"
										type="primary">
										Отправить код
									</Button>
								</Input.Group>
							</Form.Item>
						</Col>
						<Form.Item className="author-signup-2fa-button-submit">
							<Button
								htmlType="submit"
								size="large"
								type="primary"
								disabled={!isFieldsFilled}>
								Отправить заявку
							</Button>
						</Form.Item>

					</Row>
				</Form>
			</div>
		</div>
	);
};

const mstp = ({authorRegistration}) => ({
	email: authorRegistration.email,
	phoneNumber: authorRegistration.phoneNumber,
	username: authorRegistration.username,
	description: authorRegistration.description,
	categoryId: authorRegistration.categoryId,
	wallet: authorRegistration.wallet,
	royalty: authorRegistration.royalty,
	authorPhotoUrl: authorRegistration.authorPhotoUrl,
	passportFile: authorRegistration.passportFile,
});

const mdtp = (dispatch) => ({
	setUserGalleryType: (type) => dispatch(setUserGalleryType(type)),
	setCurrentStep: (step) => dispatch(setCurrentStep(step)),
	setUserInfo: (info) => dispatch(setUserInfo(info))
});

export default connect(mstp, mdtp)(AuthorSignUp2fa);
