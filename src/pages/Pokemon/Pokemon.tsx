import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Image, Button, Typography, List, Tag, Space, Layout } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";

import { Error } from "@/utils/types";
import { TEXT_DATA } from "@/utils/constants";
import { useGetPokemonByNameOrIdQuery } from "@/utils/services";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

import styles from "./Pokemon.module.scss";
import Loader from "@/components/Loader/Loader";

interface IMove {
	move: {
		name: string;
		url: string;
	};
}

interface IType {
	type: {
		name: string;
		url: string;
	};
}

export function Pokemon() {
	const navigate = useNavigate();
	const { pokemonName } = useParams();
	const { data, error, isLoading } = useGetPokemonByNameOrIdQuery(pokemonName);

	const errorMessage =
		(error as Error)?.data == TEXT_DATA.notFound
			? TEXT_DATA.pokemonNotFound
			: (error as Error)?.data;

	return (
		<Layout className={styles.layout}>
			{!isLoading && !!data && (
				<>
					<Header className={styles.header}>
						<Title>{data.species.name[0].toUpperCase() + data.species.name.slice(1)}</Title>
						<Button onClick={() => navigate(-1)}>
							<LeftCircleOutlined />
							{TEXT_DATA.back}
						</Button>
					</Header>
					<Content className={styles.content}>
						<Row>
							<Col xs={24} md={12} className={styles.imgWrap}>
								<Image.PreviewGroup items={[data.sprites.front_default, data.sprites.front_shiny]}>
									<Image alt={data.species.name} width={200} src={data.sprites.front_default} />
								</Image.PreviewGroup>
							</Col>
							<Col xs={24} md={12}>
								<List
									size="small"
									header={<Text strong>{TEXT_DATA.types}:</Text>}
									bordered
									dataSource={data.types}
									renderItem={(item: IType) => (
										<List.Item key={item.type.name}>
											<Link to={"/?type=" + item.type.name}>
												{item.type.name[0].toUpperCase() + item.type.name.slice(1)}
											</Link>
										</List.Item>
									)}
								/>
							</Col>
							<Col xs={24}>
								<Title level={2}>{TEXT_DATA.moves}</Title>
								{data.moves.map((item: IMove) => (
									<Tag key={item.move.name}>{item.move.name}</Tag>
								))}
							</Col>
						</Row>
					</Content>
				</>
			)}
			{isLoading && <Loader />}
			{!!errorMessage && (
				<Space direction="vertical" align="center">
					<Title level={2}>{errorMessage}</Title>
				</Space>
			)}
		</Layout>
	);
}
