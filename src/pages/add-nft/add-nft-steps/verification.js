import {Button, Col, Form, Input, message, Row, Typography} from "antd";
import React from "react";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {createNft, getUserAuthor, send2faEmailCode, send2faMobileCode} from "../../../utils/services/user-api.service";
import {setUserGalleryType, setUserInfo} from "../../../redux/actions/user.action";
import {connect} from "react-redux";
import {navigate} from "gatsby";
import {setNftToCreate} from "../../../redux/actions/add-nft.action";


const NftVefication = ({setCurrentStep, nftToCreate, setNftToCreate, setUserGalleryType, setUserInfo}) => {

    const [emailVerificationCode, setEmailVerificationCode] = React.useState(null);
    const [emailVerificationToken, setEmailVerificationToken] = React.useState(null);
    const [phoneVerificationCode, setPhoneVerificationCode] = React.useState(null);
    const [phoneVerificationToken, setPhoneVerificationToken] = React.useState(null);

    const [isEmailVerificationLoading, setEmailVerificationLoading] = React.useState(false);
    const [isPhoneVerificationLoading, setPhoneVerificationLoading] = React.useState(false);
    const isFieldsFilled = phoneVerificationCode && emailVerificationCode;

    const [typingEmail, setTypingEmail] = React.useState(null);
    const [typingPhoneNumber, setTypingPhoneNumber] = React.useState(null);

    const [email, setEmail] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const authorizeAuthor = async () => {
        try {
            const authorResponse = await getUserAuthor();
            setUserInfo({author: authorResponse.data});
        } catch (e) {
            if (e.response?.status === 404) {
                setUserInfo({author: null});
            } else {
                throw e;
            }
        }
    }

    const sendEmailVerificationCode = async () => {
        try {
            setEmail(typingEmail);
            setEmailVerificationLoading(true);
            setTimeout(() => setEmailVerificationLoading(false), 30 * 1000);
            const response = await send2faEmailCode(typingEmail);
            setEmailVerificationToken(response.data.token);
            message.success('Код успешно отправлен');
        } catch (err) {
            message.error(err.response?.data?.message || err.message || err);
        }
    }

    const sendPhoneVerificationCode = async () => {
        try {
            setPhoneNumber(typingPhoneNumber);
            setPhoneVerificationLoading(true);
            setTimeout(() => setPhoneVerificationLoading(false), 30 * 1000);
            const response = await send2faMobileCode(typingPhoneNumber);
            setPhoneVerificationToken(response.data.token);
            message.success('Код успешно отправлен');
        } catch (err) {
            message.error(err.response?.data?.message || err.message || err);
        }
    }

    const handleSubmit = (form) => {
        setIsLoading(true);
        async function createNftForm(nft) {
            try {
                await createNft({...nft, emailVerificationCode, emailVerificationToken, phoneVerificationCode, phoneVerificationToken, email, phoneNumber});
                setNftToCreate(null);
                navigate("/user");
                setUserGalleryType("onCreated");
                await authorizeAuthor();
                message.success('NFT успешно создан и ожидает модерации');
            } catch (err) {
                message.error(err.response?.data?.message || err.message || err);
            } finally {
                setIsLoading(false);
            }
        }
        createNftForm(nftToCreate);
    }

    return (
        <Row className="add-nft-form" align="middle" justify="center">
            <Col >
                <Form layout="vertical" onFinish={handleSubmit} >

                    <Row className="add-nft-form-wrapper">
                        <Col xs={24} style={{
                            display: 'flex',
                            alignItems: 'baseline'
                        }}>
                            <ArrowLeftOutlined
                                onClick={() => setCurrentStep(0)} />
                            <Typography.Title style={{width: '100%'}} level={2}>Верификация</Typography.Title>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                name='emailVerificationCode'
                                label="Введите email, на который будет отправлен код">
                                <Input.Group size="large" >
                                    <Input
                                        disabled={isLoading}
                                        onChange={e => setTypingEmail(e.target.value)}
                                        size="large"
                                        style={{width: 'calc(100% - 143px)'}}
                                    />
                                    <Button
                                        disabled={isEmailVerificationLoading || isLoading}
                                        onClick={sendEmailVerificationCode}
                                        className="author-signup-2fa-group-button"
                                        size="large"
                                        type="primary">
                                        Отправить код
                                    </Button>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name='phoneVerificationCode'
                                label="Введите номер телефона, на который будет отправлен код">
                                <Input.Group size="large">
                                    <Input
                                        disabled={isLoading}
                                        onChange={e => setTypingPhoneNumber(e.target.value)}
                                        size="large"
                                        style={{width: 'calc(100% - 143px)'}} />
                                    <Button
                                        disabled={isPhoneVerificationLoading || isLoading}
                                        onClick={sendPhoneVerificationCode}
                                        className="author-signup-2fa-group-button"
                                        size="large"
                                        type="primary">
                                        Отправить код
                                    </Button>
                                </Input.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                name='emailVerificationCode'
                                label="Код верификации (email)">
                                <Input
                                    size="large"
                                    disabled={isLoading}
                                    onChange={(e) => setEmailVerificationCode(e.target.value)} />

                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name='phoneVerificationCode'
                                label="Код верификации (телефон)">
                                <Input
                                    disabled={isLoading}
                                    onChange={(e) => setPhoneVerificationCode(e.target.value)}
                                    size="large"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} style={{textAlign: 'end', margin: 0}} >
                            <Form.Item className="" style={{margin: 0}}>
                                <Button
                                    loading={isLoading}
                                    disabled={!isFieldsFilled}
                                    htmlType="submit"
                                    size="large"
                                    type={'primary'}>
                                    Подвердить
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Col>
        </Row>

    );
}

const mstp = ({addNft}) => ({
    nftToCreate: addNft.nftToCreate
});
const mdtp = (dispatch) => ({
    setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
    setUserGalleryType: (type) => dispatch(setUserGalleryType(type)),
    setNftToCreate: (nft) => dispatch(setNftToCreate(nft))
});

export default connect(mstp, mdtp)(NftVefication);
