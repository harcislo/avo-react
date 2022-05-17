import React from "react";
import logoImg from "../../../images/logo.svg";
import "./GlobalLoader.scss";
export default function GlobalLoader() {
    return (
        <div className="global-loader">
            <div className="global-loader-logo"> <img src={logoImg} alt="logo" className="header__logo" /> </div><div size="large" className="global-loader-icon" ></div>
        </div>
    );
};
