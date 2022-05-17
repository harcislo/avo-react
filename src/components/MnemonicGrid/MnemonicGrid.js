import React from "react";
import { Col, Row, Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";

export default function MnemonicGrid({ mnemonic }) {
	return (
		<Row gutter={[8, 8]}>
			{mnemonic?.map((word, index) => (
				<Col xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 6 }} key={index}>
					<Paragraph>
						<Typography.Text className="text-lg">{word}</Typography.Text>
					</Paragraph>
				</Col>
			))}
		</Row>
	);
}
