import { useRouteError } from "react-router-dom";
import { Flex, Button, Typography } from "antd";

const { Title } = Typography;

export function NotFound() {
	const error = useRouteError() as Error;
	console.error(error);
	return (
		<Flex justify={"center"} align={"center"} vertical>
			<Title type="danger">Oops! Page not found 😩</Title>
			<Button type="primary" onClick={() => (window.location.href = "/")}>
				Go to Home
			</Button>
		</Flex>
	);
}
