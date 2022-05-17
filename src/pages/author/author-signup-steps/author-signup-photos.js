import React, {useState} from "react";
import {Button, Col, Form, message, Row, Typography, Upload} from "antd";
import downloadImg from "../../../images/downloadAvocdo.png";
import {setUserInfo} from "../../../redux/actions/user.action";
import {connect} from "react-redux";
import { uploadAuthorAvatar} from "../../../utils/services/user-api.service";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {setAuthorDetails, setCurrentStep} from "../../../redux/actions/author-registration.action";

const AuthorSignUpPhotos = ({setCurrentStep, setUserInfo, setAuthorDetails, authorPhotoUrl: authorUrl, passportFile}) => {
	
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => {callback(reader.result)});
		reader.readAsDataURL(img);
	}
	const [authorPhotoUrl, setAuthorPhotoUrl] = useState(authorUrl);
	const [passportPhotoUrl, setPassportPhotoUrl] = useState(passportFile && getBase64(passportFile, imageUrl => setPassportPhotoUrl(imageUrl)));
	const [authorFileList, setAuthorFileList] = useState([]);
	const [passportFileList, setPassportFileList] = useState([]);

	const savePhoto = async (form) => {
		try {
			if (form?.authorPhoto?.file) {
				const formData = new FormData();
				formData.append('file', form.authorPhoto.file, 'file');
				let response = await uploadAuthorAvatar(formData);
				setAuthorDetails({authorPhotoUrl: response.data.url})
			}
			if (form?.passportPhoto?.file) {
				setAuthorDetails({passportFile: form.passportPhoto.file})
			}
			setCurrentStep(3);
		} catch (err) {
			message.error(err.response?.data?.message || err.message || err);
		}
	};


	const handleAuthorPhotoChange = info => {
		if (info?.fileList[0]) {
			getBase64(info.fileList[0].originFileObj, imageUrl => setAuthorPhotoUrl(imageUrl));
		} else {
			setAuthorPhotoUrl(null);
			setAuthorFileList([]);
		}
	};

	const handlePassportPhotoChange = info => {
		if (info?.fileList[0]) {
			getBase64(info.fileList[0].originFileObj, imageUrl => setPassportPhotoUrl(imageUrl));
		} else {
			setPassportPhotoUrl(null);
			setPassportFileList([]);
		}
	};
	return (
		<div>
			<div
				style={{maxWidth: 900}}
				className="registration_modal">
				<Form
					onFinish={savePhoto}
					className="registration_form"
					layout="vertical">
					<ArrowLeftOutlined
						onClick={() => setCurrentStep(1)}
						className="registration_prevBtn" />
					<Typography.Title level={2}>Загрузка фото (опционально)</Typography.Title>

					<Row
						align="top"
						justify="space-between">
						<Col
							xs={24}
							sm={11}>
							<div className="registration-photos-upload-title">
								Загрузите ваше фото для аккаунта автора
							</div>
							<Form.Item
								name='authorPhoto'
								noStyle>
								<Upload.Dragger
									className="registration-photos-upload-dragger"
									maxCount={1}

									onChange={handleAuthorPhotoChange}
									beforeUpload={file => {
										setAuthorFileList([file]);
										return false;
									}}
									fileList={authorFileList}>
									{authorPhotoUrl ?
										<img
											src={authorPhotoUrl}
											alt="avatar"
											style={{width: '100%'}} /> :
										<div className="registration-photos-upload-description">
											<p className="ant-upload-drag-icon">
												<img className="downloadAvocado" src={downloadImg} alt="downloadImg" />
											</p>
											{/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
											<p className="ant-upload-hint">
												Нажмите или перетащите файл в эту область для загрузки
											</p>
										</div>
									}

								</Upload.Dragger>
							</Form.Item>
						</Col>


						<Col
							xs={24}
							sm={11}>
							<div className="registration-photos-upload-title">
								Загрузите фото/скан вашего паспорта
							</div>
							<Form.Item
								name='passportPhoto'
								noStyle>
								<Upload.Dragger
									className="registration-photos-upload-dragger"
									maxCount={1}
									onChange={handlePassportPhotoChange}
									beforeUpload={file => {
										setPassportFileList([file]);
										return false;
									}}
									fileList={passportFileList}>
									{passportPhotoUrl ?
										<img
											src={passportPhotoUrl}
											alt="avatar"
											style={{width: '100%'}} /> :
										<div className="registration-photos-upload-description">
											<p className="ant-upload-drag-icon">
												<img className="downloadAvocado" src={downloadImg} alt="downloadImg" />
											</p>
											{/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
											<p className="ant-upload-hint">
												Нажмите или перетащите файл в эту область для загрузки
											</p>
										</div>
									}

								</Upload.Dragger>
							</Form.Item>
						</Col>

					</Row>

					<Row
						style={{margin: 0, padding: 0}}
						justify="end"
						className="registration_modal_footer">
						<Form.Item className="registration-photos-button-submit">
							<Button
								htmlType="submit"
								size="large"
								type={!authorPhotoUrl && !passportPhotoUrl ? "default" : "primary"}>
								{!authorPhotoUrl && !passportPhotoUrl ? 'Пропустить' : 'Сохранить'}
							</Button>
						</Form.Item>
					</Row>
				</Form>
			</div>
		</div>
	);
};

const mdtp = (dispatch) => ({
	setUserInfo: (info) => dispatch(setUserInfo(info)),
	setCurrentStep: (step) => dispatch(setCurrentStep(step)),
	setAuthorDetails: (details) => dispatch(setAuthorDetails(details)),
});

const mstp = ({authorRegistration}) => ({
	authorPhotoUrl: authorRegistration.authorPhotoUrl,
	passportFile: authorRegistration.passportFile,
});

export default connect(mstp, mdtp)(AuthorSignUpPhotos);
