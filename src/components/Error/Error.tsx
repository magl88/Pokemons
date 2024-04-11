import { useRouteError } from "react-router-dom";

import { Flex, Button, Typography } from "antd";

const { Title } = Typography;

const Error = () => {
	const error = useRouteError() as Error;

	console.error(error);

	return (
		<Flex justify={"center"} align={"center"} vertical>
			<Title type="danger">Uh oh, something went terribly wrong </Title>
			<Button type="primary" onClick={() => (window.location.href = "/")}>
				Click here to reload the app
			</Button>
		</Flex>
	);
};

export default Error;
