import React, {useEffect} from "react";

import {connect, useSelector} from "react-redux";
import {Col, Row, Steps} from "antd";
import AuthorSignUpMainInfo from "./author-signup-steps/author-signup-main-info";
import RegistrationFour from "./author-signup-steps/author-signup-2fa";
import RegistrationTwo from "./author-signup-steps/auhtor-signup-details";
import RegistrationThree from "./author-signup-steps/author-signup-photos";
import "./singup.scss";
import {navigate} from "gatsby";
import {resetAuthorDetails, setCurrentStep} from "../../redux/actions/author-registration.action";

const {Step} = Steps;

const AuthorSignUp = ({isAuth, author, setCurrentStep, resetAuthorDetails}) => {
	const steps = [<AuthorSignUpMainInfo />, <RegistrationTwo />, <RegistrationThree />, <RegistrationFour />];
	const currentStep = useSelector((state) => state.authorRegistration.currentStep);
	useEffect(() => {
		if (!isAuth || author) {
			navigate(`/`);
		}

		return () => {
			resetAuthorDetails();
			setCurrentStep(0);
		}
	}, [isAuth, author]); // eslint-disable-line
	return (
		<Row align="middle" justify="center">
			<Col style={{maxWidth: 700, paddingLeft: 10, paddingRight: 10}} xs={{span: 24}} sm={{span: 20}} md={{span: 14}}>
				<Steps size="default" current={currentStep}>
					{steps.map((_step, index) =>
						<Step style={{marginLeft: 10, marginRight: 10}} key={index} title={`Шаг №${index + 1}`} />
					)}
				</Steps>
				{steps[currentStep]}
			</Col>
		</Row>
	);
};

const mstp = ({user, authorization}) => ({
	author: user.author,
	isAuth: authorization.isAuth
});

const mdtp = (dispatch) => ({
	setCurrentStep: (step) => dispatch(setCurrentStep(step)),
	resetAuthorDetails: () => dispatch(resetAuthorDetails())
});

export default connect(mstp, mdtp)(AuthorSignUp);
