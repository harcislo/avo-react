import React, {useEffect, useState} from "react";
import avoImg from "../../../images/avo.svg";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "./GalleryCard.scss";
import {Link} from "gatsby";
import SmoothLoadedImage from "../../SmoothLoadedImage/SmoothLoadedImage";
import {makeNftImageSrc} from "../../../utils/nft.utils";
import {HeartFilled, HeartOutlined, LoadingOutlined} from "@ant-design/icons";
import {deleteLikedCard, likeCard} from "../../../utils/services/user-api.service";

import {useDispatch, useSelector} from "react-redux";
import {addLike, removeLike} from "../../../redux/actions/user.action";
import {Card, Col, message, Row, Space, Tooltip, Typography} from "antd";
import ReactPlayer from "react-player";

export default function GalleryCard({nft, loading, isUserNft}) {
    const cardImageSrc = makeNftImageSrc(nft);
    const isAuth = useSelector((state) => state.authorization.isAuth);
    const nftLikes = useSelector((state) => state.user.nftLikes);
    const userId = useSelector((state) => state.user.userId);
    const [isLiked, setIsLiked] = useState(false);
    const [onMouseLike, setOnMouseLike] = useState(false);
    const [isImgVisible, setIsImgVisible] = useState(false);
    const isVideo = nft?.content_type?.split("/")[0] === "video";
    const dispatch = useDispatch();
    const likedHandler = async (e) => {
        try {
            e.preventDefault();

            if (!isAuth) {
                message.warning("Чтобы поставить лайк необходимо авторизоватся");
            }

            if (isAuth) {
                const dataLike = {
                    user_id: userId,
                    nft_id: nft.nft_id || nft.id,
                };

                setIsLiked(!isLiked);
                isLiked && (await deleteLikedCard({...dataLike})) && dispatch(removeLike(dataLike));
                !isLiked && (await likeCard({...dataLike})) && dispatch(addLike(dataLike));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (isAuth && nftLikes) {
            nftLikes.filter((el) => el.nft_id === (nft.nft_id || nft.id)).length > 0 && setIsLiked(true);
        }
    }, [nftLikes, nft.nft_id || nft.id]); // eslint-disable-line
    useEffect(() => {
        if (!isVideo) {
            const img = new Image();
            img.onload = function () {
                setIsImgVisible(true);
            };
            img.src = makeNftImageSrc(nft);
        } else {
            setIsImgVisible(true);
        }

    }, []); // eslint-disable-line

    return (
        <>
            <Link style={{margin: 15}} to={`/gallery-nft/nft?id=${nft.nft_id || nft.id}`}>
                <Card
                    loading={loading}
                    className="antd-card"
                    hoverable
                    bodyStyle={{
                        padding: "10px 10px 13px 10px",
                    }}
                    cover={
                        isImgVisible ? (
                            isVideo ?
                                <ReactPlayer
                                    url={cardImageSrc}
                                    playing
                                    muted
                                    className="gallery-card-video"
                                    loop={true}
                                /> : <SmoothLoadedImage
                                    className="works__img"
                                    height="200px"
                                    width="100%"
                                    alt="example"
                                    src={cardImageSrc}
                                />
                        ) : (
                            <div
                                style={{
                                    height: 200,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <LoadingOutlined
                                    style={{
                                        fontSize: 30,
                                        width: 30,
                                        height: 30,
                                        fontWeight: 700,
                                        color: "#ACD044",
                                    }}
                                />
                            </div>
                        )
                    }
                >
                    <Typography.Text className="text-lg" strong>
                        {nft.title.length > 18 ? nft.title.slice(0, 18) + "..." : nft.title}
                    </Typography.Text>
                    <Row align="bottom">
                        {isUserNft ? <Col span={3}></Col> :
                            <Col span={3}>
                                {isLiked ? (
                                    <HeartFilled
                                        onClick={(e) => likedHandler(e)}
                                        style={{fontSize: "20px", color: "#ff4d4f"}}
                                        className="works__block__left__like"
                                    />
                                ) : (
                                    <HeartOutlined
                                        onMouseEnter={() => setOnMouseLike(true)}
                                        onMouseLeave={() => setOnMouseLike(false)}
                                        className="works__block__left__like"
                                        onClick={(e) => likedHandler(e)}
                                        style={{
                                            fontSize: "20px",
                                            color: onMouseLike ? "#ff4d4f" : "#ACD044",
                                        }}
                                    />
                                )}
                            </Col>
                        }
                        <Col span={21}>

                            <Row justify={"end"} align={"bottom"}>
                                {nft.nftAmount ? <Col className='gallery-card-owned-nft'>
                                    x{nft.nftAmount}
                                </Col> : null}


                                <Col>
                                    <LazyLoadImage style={{padding: 7}} src={avoImg} />
                                </Col>

                                <Col>
                                    <Space size={0} direction="vertical" align={"end"}>


                                        <Typography.Text className="text-lg" strong>

                                            <Tooltip placement="top" title={`≈ ${nft.price.rub} ₽`}>
                                                {nft.price.avo} avo
                                            </Tooltip>
                                        </Typography.Text>
                                        <Typography.Text
                                            style={{
                                                fontSize: 12,
                                                position: "absolute",
                                                right: 0,
                                                top: 20,
                                            }}
                                            type="secondary"
                                            strong
                                        >
                                            ≈ {nft.price.rub}₽
                                        </Typography.Text>
                                    </Space>
                                </Col>


                            </Row>


                        </Col>
                    </Row>
                </Card>
            </Link>
        </>
    );
}
