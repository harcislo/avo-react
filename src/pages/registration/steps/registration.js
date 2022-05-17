import React from "react";
import foxImg from "./images/fox.png";
import bigAvo from "./images/big_avo.png";
import { connect } from "react-redux";
import { setMetaMaskWallet, setStep } from "../../../redux/actions/registration.ation";
import { Button, Col, message, Row, Typography } from "antd";
import { MetamaskLogin } from "metamask-node-auth";

const mdtp = (dispatch) => ({
	setStep: (step) => dispatch(setStep(step)),
	setMetaMaskWallet: (wallet) => dispatch(setMetaMaskWallet(wallet)),
});

const RegistrationPage = ({ setStep, setMetaMaskWallet }) => {
	const onMetamaskConn = async () => {
		try {
			await MetamaskLogin.connectWallet();
			setMetaMaskWallet(MetamaskLogin.wallet);
			setStep(1);
		} catch (err) {
			if (err?.code === 4001) {
				return message.warning("Запрос на подлючение отклонён");
			}
		}
	};
	const nextStep = () => {
		setStep(1);
	};
	return (
		<>
			<Row style={{ margin: 15 }} justify="center" className="registration-one">
				<Col className="registration__item">
					<img src={foxImg} alt="" className="registration__img" />

					<Button onClick={onMetamaskConn} size="large" type="primary">
						С METAMASK
					</Button>
				</Col>

				<Col className="registration__item">
					<img src={bigAvo} alt="" className="registration__img" />

					<Button onClick={nextStep} size="large" type="primary">
						Секретная фраза
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default connect(null, mdtp)(RegistrationPage);
