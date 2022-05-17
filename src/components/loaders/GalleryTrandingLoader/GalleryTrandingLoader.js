import React from "react";
import { Skeleton, Row, Col } from 'antd';

import "./GalleryTrandingLoader.scss";

const GalleryTrandingLoader = (props) => (
	<Row className="gallery__tranding-main-loader" gutter={16} justify='center'	>
		<Col xs={24} sm={24} md={12} className="gallery__tranding-loader"><Skeleton.Button style={{height: 390, margin: 8}} block active/></Col>
		<Col xs={24} sm={24} md={12} style={{paddingRight: 30}}>
			<Row gutter={16}>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}}  block active/></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block active /></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block active /></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block active/></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block active/></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block active/></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block active/></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block active/></Col>
				<Col xs={8}><Skeleton.Button style={{height: 120, margin: 8}} block  active/></Col>
			</Row>
		</Col>
	</Row>
);

export default GalleryTrandingLoader;
