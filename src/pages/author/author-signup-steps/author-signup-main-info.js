import React from "react";
import {Button, Form, Input, Row, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import {connect} from "react-redux";
import {
	setCurrentStep,
	setAuthorCredentials,
} from "../../../redux/actions/author-registration.action";
import {navigate} from "gatsby";
import {setUserGalleryType} from "../../../redux/actions/user.action";

const AuthorSignUpMainInfo = ({
	setCurrentStep,
	setAuthorCredentials,
	setUserGalleryType,
	username,
	email,
	phoneNumber,
	description
}) => {

	const nextHandler = (form) => {
		setAuthorCredentials(form);
		setCurrentStep(1);
	};
	return (
		<div>
			<div className="registration_modal">
				<Form
					onFinish={nextHandler}
					initialValues={{
						username,
						email,
						phoneNumber,
						description
					}}
					className="registration_form"
					layout="vertical">
					<Typography.Title level={2}>Регистрация</Typography.Title>

					<Form.Item
						label="Введите ваше имя фамилию или псевдоним"
						name="username"
						rules={[{required: true, message: "Обязательное поле"}]}>
						<Input
							maxLength={100}
							type="text"
							placeholder="Логин"
							allowClear={true}
							size="large" />
					</Form.Item>

					<Form.Item
						label="Адрес электронной почты"
						name="email"
						rules={[
							{required: true, message: "Обязательное поле"},
							{type: "email", message: "Введите валидную почту"},
						]}>
						<Input
							type="text"
							placeholder="Почта"
							allowClear={true}
							size="large" />
					</Form.Item>

					<Form.Item
						name="phoneNumber"
						label="Номер телефона"
						rules={[{required: true, message: "Обязательное поле"}]}>
						<Input

							maxLength={15}
							style={{width: "100%"}}
							size="large" />
					</Form.Item>

					<Form.Item
						name="description"
						label="Расскажите о себе и своём творчестве"
						rules={[{required: true, message: "Обязательное поле"}, {
							validator(_, description) {
								if (description && description.length < 50) {
									return Promise.reject('Минимум 50 символов');
								}
								return Promise.resolve();
							}
						}]}>

						<TextArea

							rows={4}
							placeholder="Введите текст"
							maxLength={250} />

					</Form.Item>

					<Row justify="end" className="registration_modal_footer">
						<Button
							onClick={() => {
								navigate("/user");
								setUserGalleryType("onCreated")
							}}
							style={{marginRight: 15}}
							size="large">
							Выйти
						</Button>

						<Form.Item>
							<Button htmlType="submit" size="large" type="primary">
								Далее
							</Button>
						</Form.Item>
					</Row>
				</Form>
			</div>
		</div>
	);
};


const mstp = ({authorRegistration}) => ({
	username: authorRegistration.username,
	email: authorRegistration.email,
	phoneNumber: authorRegistration.phoneNumber,
	description: authorRegistration.description
});
const mdtp = (dispatch) => ({
	setCurrentStep: (step) => dispatch(setCurrentStep(step)),
	setAuthorCredentials: (authorCredentials) => dispatch(setAuthorCredentials(authorCredentials)),
	setUserGalleryType: (galleryType) => dispatch(setUserGalleryType(galleryType))
});

export default connect(mstp, mdtp)(AuthorSignUpMainInfo);
