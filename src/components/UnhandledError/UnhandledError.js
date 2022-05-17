import React from "react";
import { Typography, Result } from "antd";
import { supportBotUrl } from "../../constants";

export default function UnhandledError() {
	return (
		<Result
			status="warning"
			title="Упс, что-то пошло не так :("
			subTitle={
				<Typography.Text>
					Попробуйте позже, если ошибка будет возникать снова, то вы можете обратится в &nbsp;
					<Typography.Link target="_blank" href={supportBotUrl}>
						нашу службу поддержки
					</Typography.Link>
				</Typography.Text>
			}
		/>
	);
}
