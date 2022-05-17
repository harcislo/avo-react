import React from "react";
import "./socialbuttons.scss";

import SocialTelegram from "../../assets/icons/telegram.svg";
import SocialFacebook from "../../assets/icons/facebook.svg";
import SocialInstagram from "../../assets/icons/instagram.svg";

const SocialButtons = () => {
	return (
		<div className="socialButtons">
			<a href="#" className="telegram">
				<img src={SocialTelegram} alt="" />
			</a>
			<a href="#" className="facebook">
				<img src={SocialFacebook} alt="" />
			</a>
			<a href="#" className="instagram">
				<img src={SocialInstagram} alt="" />
			</a>
		</div>
	);
};

export default SocialButtons;
