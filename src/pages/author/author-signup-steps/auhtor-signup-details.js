import React, {useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, Row, Select, Typography} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {
	setCurrentStep,
	setAuthorDetails
} from "../../../redux/actions/author-registration.action";
import {getNftCategories} from "../../../utils/services/user-api.service";
import {connect} from "react-redux";

const {Option} = Select;

const AuthorSignUpDetails = ({
	categoryId,
	wallet,
	royalty,
	setAuthorDetails,
	setCurrentStep,
}) => {

	const [categories, setCategories] = useState(null);

	useEffect(() => {
		getNftCategories({type: "nft"}).then((res) => setCategories(res.data));
	}, []);

	const nextHandler = (form) => {
		setAuthorDetails(form);
		setCurrentStep(2);
	};

	return (
		<div>
			<div className="registration_modal">
				<Form
					onFinish={nextHandler}
					initialValues={{
						categoryId,
						wallet,
						royalty
					}}
					className="registration_form"
					layout="vertical">
					<ArrowLeftOutlined
						onClick={() => setCurrentStep(0)}
						className="registration_prevBtn" />
					<Typography.Title level={2}>Регистрация</Typography.Title>

					<Form.Item
						name="categoryId"
						label="Выберите основную сферу вашего творчества"
						hasFeedback
						rules={[{required: true, message: "Обязательное поле"}]}>
						<Select placeholder="Выберите">
							{categories
								? categories.map((category, index) =>
									<Option
										key={index}
										value={category.id}>
										{category.name}
									</Option>)
								: null
							}
						</Select>
					</Form.Item>

					<Form.Item
						label="Введите адрес вашего BSC кошелька, для получения роялти"
						name="wallet"
						rules={[{required: true, message: "Обязательное поле"}]}
					>
						<Input
							type="text"
							placeholder="Введите"
							allowClear={true}
							size="large"
						/>
					</Form.Item>

					<Form.Item
						label="Процент от продажи ваших работ (роялти)"
						name="royalty"
						rules={[{required: true, message: "Обязательное поле"}]}>
						<InputNumber
							style={{width: '100%'}}
							max={20}
							min={1}
							placeholder="Введите"
							size="large"
						/>
					</Form.Item>

					<Row
						justify="end"
						className="registration_modal_footer">
						<Form.Item>
							<Button
								htmlType="submit"
								size="large"
								type="primary">
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
	categoryId: authorRegistration.categoryId,
	wallet: authorRegistration.wallet,
	royalty: authorRegistration.royalty
});

const mdtp = (dispatch) => ({
	setAuthorDetails: (authorDetails) => dispatch(setAuthorDetails(authorDetails)),
	setCurrentStep: (step) => dispatch(setCurrentStep(step)),
});

export default connect(mstp, mdtp)(AuthorSignUpDetails);
