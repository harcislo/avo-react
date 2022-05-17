import React from "react";
import { connect } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";
import RegistrationZero from "./steps/registration";
import RegistrationOne from "./steps/registration-one";
import RegistrationTwo from "./steps/registration-two";
import RegistrationThree from "./steps/registration-three";
import "./registration.scss";

import "./styles/index.scss";
import { Link } from "gatsby";

const mstp = ({ registration }) => ({
	currentStep: registration.currentStep,
});

const Registration = ({ currentStep }) => {
	const steps = [<RegistrationZero />, <RegistrationOne />, <RegistrationTwo />, <RegistrationThree />];
	return (
		<>
			<div className="registration__wrapper">
				<BreadCrumbs />
				<div>{steps[currentStep]}</div>
				{currentStep === 0 && (
					<div className="login__btn">
						<Link to="/authorization">Войти</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default connect(mstp)(Registration);
