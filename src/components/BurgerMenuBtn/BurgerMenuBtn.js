import React from "react";
import { connect } from "react-redux";
import { toggleMenuAction } from "../../redux/actions/menu.action";
import "./BurgerMenuBtn.scss";

function BurgerMenuBtn({ opened, toggleMenu }) {
	return (
		<button className={`burger border-btn ${opened ? "close" : ""}`} onClick={toggleMenu}>
			<span></span>
		</button>
	);
}

const mstp = ({ menu }) => ({
	opened: menu.menuIsActive,
});
const mdtp = (dispatch) => ({
	toggleMenu: () => dispatch(toggleMenuAction()),
});

export default connect(mstp, mdtp)(BurgerMenuBtn);
