import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Divider, Form, message, Row, Typography } from "antd";
import { setMnemonic, setStep } from "../../../redux/actions/registration.ation";
import { connect } from "react-redux";
import { getPassphrase } from "../../../utils/services/user-api.service";
import "../registration.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MnemonicGrid from "../../../components/MnemonicGrid/MnemonicGrid";
import UnhandledError from "../../../components/UnhandledError/UnhandledError";

const mstp = ({ registration }) => ({
	mnemonic: registration.mnemonic,
});

const mdtp = (dispatch) => ({
	setStep: (step) => dispatch(setStep(step)),
	setMnemonic: (mnemonic) => dispatch(setMnemonic(mnemonic)),
});

const RegistrationTwo = ({ setStep, setMnemonic, mnemonic }) => {
	const [error, setError] = useState(false);
	useEffect(() => {
		async function fetchPassPhrase() {
			try {
				let res = await getPassphrase();
				setMnemonic(res?.data?.passphrase?.split(" "));
			} catch (e) {
				setError(true);
				message.error("Произошла ошибка при получении фразы");
			}
		}

		fetchPassPhrase();
	}, []); // eslint-disable-line
	const nextStep = () => {
		setStep(3);
	};
	return error ? (
		<UnhandledError />
	) : (
		<>
			<div className="registration_modal">
				<Form className="registration_form">
					<ArrowLeftOutlined onClick={() => setStep(1)} className="registration_prevBtn" />
					<Typography.Title level={2}>Ваша фраза</Typography.Title>
					<Typography.Text>Скопируйте фразу и сохраните ее удобным вам способом</Typography.Text>

					<Divider />

					<MnemonicGrid mnemonic={mnemonic} />

					<Row align={"middle"} justify="space-between" className="registration_modal_footer">
						<CopyToClipboard text={mnemonic?.join(" ")} onCopy={() => message.success("Фраза скопирована")}>
							{/*<img src={files} alt="" /> Скопировать*/}
							<Button size="large"> Скопировать</Button>
						</CopyToClipboard>

						<Button htmlType="submit" size="large" onClick={nextStep} type="primary">
							Продолжить
						</Button>
					</Row>
				</Form>
			</div>
		</>
	);
};

export default connect(mstp, mdtp)(RegistrationTwo);
