import React, { useEffect, useState } from "react";
import "./Author.scss";
import { Link } from "gatsby";
import SmoothLoadedImage from "../../SmoothLoadedImage/SmoothLoadedImage";
import { Card, Row, Space, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AuthorCard = ({ author }) => {
	const [isImgVisible, setIsImgVisible] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.onload = function () {
			setIsImgVisible(true);
		};
		img.src = author.img;
	}, []);

	return (
		<Link style={{ margin: 15 }} to={`/authors/author?id=${author.id}`}>
			<Card
				style={{
					height: 308,
				}}
				className="antd-card"
				hoverable
				bodyStyle={{
					padding: 10,
				}}
				cover={
					isImgVisible ? (
						<SmoothLoadedImage
							className="works__img"
							height="200px"
							width="100%"
							alt="example"
							src={author.img}
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
				<Row align="middle" justify="center">
					<Space align="center" direction="vertical">
						<Typography.Text className="text-lg" strong>
							{author.name}
						</Typography.Text>
						<Typography.Text>
							{author.description?.length > 25
								? author.description.slice(0, 25) + "..."
								: author.description}
						</Typography.Text>
					</Space>
				</Row>
			</Card>
		</Link>
	);
};

export default AuthorCard;
