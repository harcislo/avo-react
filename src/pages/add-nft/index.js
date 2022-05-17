import React, {useEffect, useState} from "react";

import {connect} from "react-redux";
import {Col, Row} from "antd";

import AddNftForm from './add-nft-steps/add-nft';
import VerifyNftForm from './add-nft-steps/verification';
import {navigate} from "gatsby";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";


const AddNft = ({isAuth}) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [<AddNftForm setCurrentStep={setCurrentStep} />, <VerifyNftForm setCurrentStep={setCurrentStep} />];
    useEffect(() => {
        if (!isAuth) {
            navigate(`/`);
        }
    }, [isAuth]); // eslint-disable-line
    return (
        <Row align="middle" justify="center">

            <Col xs={24}>
                <BreadCrumbs />
            </Col>
            <Col style={{maxWidth: 700, paddingLeft: 10, paddingRight: 10}} xs={24} sm={20} md={14}>
                {steps[currentStep]}
            </Col>
        </Row>
    );
};

const mstp = ({authorization}) => ({
    isAuth: authorization.isAuth
});
export default connect(mstp)(AddNft);
