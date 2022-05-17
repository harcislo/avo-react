import React, { useState } from "react";
import { Typography } from "antd";

export default function WorkDescription({ text = "" }) {
	const CHARS_LIMIT = 120;
	const clipDescription = (str) => (str.trim().length > CHARS_LIMIT ? str.slice(0, CHARS_LIMIT) + "..." : str);

	const [descriptionOpened, setDescriptionOpened] = useState(false);
	const [description, setDescription] = useState(clipDescription(text));

	return (
		<>
			<div className="work__caption line">
				<Typography.Text type="secondary" strong>
					Краткое описание
				</Typography.Text>
			</div>
			<Typography.Paragraph>{description}</Typography.Paragraph>
			{text.trim().length > CHARS_LIMIT ? (
				<button
					className="work__more"
					onClick={() => {
						if (descriptionOpened) {
							setDescription(clipDescription(text));
						}
						if (!descriptionOpened) {
							setDescription(text);
						}
						setDescriptionOpened(!descriptionOpened);
					}}
				>
					{descriptionOpened ? "Свернуть" : "Развернуть"}
				</button>
			) : (
				""
			)}
		</>
	);
}
