import {Button, Col, Form, Input, message, Row, Select, Upload, InputNumber} from "antd";
import React, {useEffect, useState} from "react";
import {createNft, getNftCategories, getUserAuthor} from "../../../utils/services/user-api.service";
import downloadImg from "../../../images/downloadAvocdo.png";
import {setUserGalleryType, setUserInfo} from "../../../redux/actions/user.action";
import {connect} from "react-redux";
import {setNftToCreate} from "../../../redux/actions/add-nft.action";
import {navigate} from "gatsby";
const {Option} = Select;

const AddNftForm = ({setUserInfo, author, setCurrentStep, setNftToCreate, nftToCreate, setUserGalleryType}) => {
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {callback(reader.result)});
        reader.readAsDataURL(img);
    }
    const [categories, setCategories] = useState(null);
    const [fileUrl, setFilePhotoUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isPreviewVisible, setPreviewVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (nftToCreate) {
            if (nftToCreate.file) {
                if (nftToCreate.file[0].type.includes('image')) {
                    getBase64(nftToCreate.file[0].originFileObj, imageUrl => setFilePhotoUrl(imageUrl));
                } else {
                    setPreviewVisible(false);
                }
            }
            if (nftToCreate.preview) {
                getBase64(nftToCreate.preview[0].originFileObj, imageUrl => setPreviewUrl(imageUrl));
            }
        }
    }, []); // eslint-disable-line

    const isAuthorFullyVerified = author && author.status === 'active';

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

    useEffect(() => {
        async function loadData() {
            try {
                const categoriesData = await getNftCategories({type: "nft"});
                setCategories(categoriesData.data);
                await authorizeAuthor();
            } catch (err) {
                message.error(err.response?.data?.message || err.message || err);
            }
        }
        loadData();
    }, []);  // eslint-disable-line



    const handleFileChange = info => {

        if (info?.fileList[0]) {
            if (info?.fileList[0]?.type?.includes('image')) {
                getBase64(info.fileList[0].originFileObj, imageUrl => setFilePhotoUrl(imageUrl));
            }
        } else {
            setFilePhotoUrl(null);
        }
        if (info?.fileList.length === 0) {
            setPreviewVisible(true);
        }
    };
    const handlePreviewChange = info => {
        if (info?.fileList[0]) {
            if (info?.fileList[0]?.type?.includes('image')) {
                getBase64(info.fileList[0].originFileObj, imageUrl => setPreviewUrl(imageUrl));
            }
        } else {
            setPreviewUrl(null);
        }
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const handleSubmit = (form) => {
        setIsLoading(true);
        async function createNftForm(nft) {
            try {
                await createNft(nft);
                setNftToCreate(null);
                navigate("/user");
                setUserGalleryType("onCreated");
                await authorizeAuthor();
                message.success('NFT успешно создан и ожидает модерации')
            } catch (err) {
                message.error(err.response?.data?.message || err.message || err);
            } finally {
                setIsLoading(false);
            }
        }
        if (!author) {
            setCurrentStep(1);
            setNftToCreate(form);
        } else {
            createNftForm(form);
        }
    }
    return (
        <Row className="add-nft-form" align="middle" justify="center">
            <Col >
                <Form layout="vertical" onFinish={handleSubmit} initialValues={nftToCreate} >
                    <Row >
                        <Col
                            className="add-nft-form-wrapper"
                            xs={24}
                            md={12}>
                            <Form.Item
                                className="add-nft-form-upload"
                                required
                                rules={[
                                    {required: true, message: "Загрузите NFT"},
                                    {
                                        validator: (_r, files) => {
                                            if (files && files[0] && !files[0].type.match(/audio|video|image/)) {
                                                return Promise.reject('NFT должен быть представлен картинкой, видео или музыкой');
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                label='Загрузка NFT'
                                name='file'
                                valuePropName="fileList" getValueFromEvent={normFile} >
                                <Upload.Dragger
                                    disabled={isLoading}
                                    maxCount={1}
                                    onChange={handleFileChange}
                                    beforeUpload={file => {
                                        if (!file || file?.type.includes('image')|| file?.type.includes('video')) {
                                            setPreviewVisible(true);
                                        } else {
                                            setPreviewVisible(false);
                                        }
                                        return false;
                                    }}
                                >
                                    {fileUrl ?
                                        <img
                                            src={fileUrl}
                                            alt="avatar"
                                            style={{width: '100%'}} /> :
                                        <div className="registration-photos-upload-description">
                                            <p className="ant-upload-drag-icon">
                                                <img className="downloadAvocado" src={downloadImg} alt="downloadImg" />
                                            </p>
                                            {/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                                            <p className="ant-upload-hint">
                                                Нажмите или перетащите NFT в эту область для загрузки
                                            </p>
                                        </div>
                                    }

                                </Upload.Dragger>
                            </Form.Item>

                            {!isPreviewVisible && <Form.Item
                                className="add-nft-form-upload"
                                required
                                rules={[
                                    {required: true, message: "Загрузите превью"},
                                ]}
                                label='Превью'
                                name='preview'
                                valuePropName="fileList" getValueFromEvent={normFile} >
                                <Upload.Dragger
                                    disabled={isLoading}
                                    name="files"
                                    maxCount={1}
                                    onChange={handlePreviewChange}
                                    beforeUpload={file => {
                                        if (file && !file.type.includes('image')) {
                                            message.error(`${file.name} превью должно быть картинкой`);
                                            return true;
                                        }
                                        return false;
                                    }}
                                >
                                    {previewUrl ?
                                        <img
                                            src={previewUrl}
                                            alt="avatar"
                                            style={{width: '100%'}} /> :
                                        <div className="registration-photos-upload-description">
                                            <p className="ant-upload-drag-icon">
                                                <img className="downloadAvocado" src={downloadImg} alt="downloadImg" />
                                            </p>
                                            {/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                                            <p className="ant-upload-hint">
                                                Нажмите или перетащите превью для NFT в эту область для загрузки
                                            </p>
                                        </div>
                                    }

                                </Upload.Dragger>
                            </Form.Item>}

                        </Col>

                        <Col
                            className="add-nft-form-wrapper"
                            xs={24}
                            md={12}>
                            <Row>
                                <Col xs={24}>
                                    <Form.Item
                                        name='title'
                                        label='Название'
                                        required
                                        rules={[{required: true, message: "Обязательное поле"}]}>
                                        <Input
                                            allowClear={true}
                                            disabled={isLoading}
                                            size="large" />
                                    </Form.Item>
                                </Col>

                                <Col xs={24}>
                                    <Form.Item
                                        name='description'
                                        label='Описание'
                                        required
                                        rules={[{required: true, message: "Обязательное поле"}]}>
                                        <Input
                                            allowClear={true}
                                            disabled={isLoading}
                                            size="large"
                                            minLength={50}
                                            maxLength={1024} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24}>
                                    <Form.Item
                                        name='price'
                                        label='Цена'
                                        required
                                        rules={[{required: true, message: "Обязательное поле"}]}>
                                        <InputNumber
                                            disabled={isLoading}
                                            style={{width: '100%'}}
                                            size="large"
                                            min={0} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24}>
                                    <Form.Item
                                        name='emission'
                                        label='Доступное количество NFT к покупке'
                                        required
                                        rules={[{required: true, message: "Обязательное поле"}]}>
                                        <Input
                                            allowClear={true}
                                            disabled={isLoading}
                                            size="large"
                                            type='number'
                                            min={1} />
                                    </Form.Item>
                                </Col>

                                {isAuthorFullyVerified && <Col xs={24}>
                                    <Form.Item
                                        name='licence'
                                        label='Тип лицензии'
                                        required
                                        rules={[{required: true, message: "Обязательное поле"}]}>
                                        <Select
                                            size="large"
                                            disabled={isLoading}>
                                            <Option
                                                value={'simple'}>
                                                Простая (неисключительная) полная лицензия
                                            </Option>
                                            <Option
                                                value={'full'}>
                                                Исключительная полная лицензия
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>}

                                {isAuthorFullyVerified && <Col xs={24}>
                                    <Form.Item
                                        name='percent'
                                        label='Процент от продаж'
                                        required
                                        rules={[{required: true, message: "Обязательное поле"}]}>
                                        <InputNumber
                                            disabled={isLoading}
                                            style={{width: '100%'}}
                                            size="large"
                                            min={0}
                                            max={20} />
                                    </Form.Item>
                                </Col>}

                                <Col xs={24}>
                                    <Form.Item

                                        name="categoryId"
                                        label="Выберите тематику NFT"
                                        hasFeedback
                                        rules={[{required: true, message: "Обязательное поле"}]}>
                                        <Select
                                            size="large"
                                            disabled={isLoading}>
                                            {categories
                                                ? categories.map((category, index) =>
                                                    <Option
                                                        key={index}
                                                        value={category.id}>
                                                        {category.name}
                                                    </Option>)
                                                : null
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} style={{textAlign: 'end', margin: 0}} >
                                    <Form.Item className="" style={{margin: 0}}>
                                        <Button
                                            loading={isLoading}
                                            htmlType="submit"
                                            size="large"
                                            type={'primary'}>
                                            Создать
                                        </Button>
                                    </Form.Item>
                                </Col>

                            </Row>

                        </Col>
                    </Row>

                </Form>
            </Col>
        </Row>

    );
}

const mstp = ({user, addNft}) => ({
    author: user.author,
    nftToCreate: addNft.nftToCreate
});
const mdtp = (dispatch) => ({
    setUserGalleryType: (type) => dispatch(setUserGalleryType(type)),
    setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
    setNftToCreate: (nft) => dispatch(setNftToCreate(nft))
});

export default connect(mstp, mdtp)(AddNftForm);
