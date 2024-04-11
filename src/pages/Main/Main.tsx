import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useGetPokemonsQuery, useGetTypesQuery } from "@/utils/services";

import { List, Layout, Select, Typography, Space } from "antd";
import { TEXT_DATA } from "@/utils/constants";
import Loader from "@/components/Loader/Loader";
import { Error } from "@/utils/types";
const { Text, Title } = Typography;
const { Header, Content } = Layout;

export function Main() {
	const typesData = useGetTypesQuery(undefined);
	const [searchParams, setSearchParams] = useSearchParams();

	const [selectType, setSelectType] = useState(
		!!searchParams.get("type") ? searchParams.get("type") : "all",
	);
	const [limit, setLimit] = useState(
		!!searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
	);
	const [offset, setOffset] = useState(
		!!searchParams.get("offset") ? Number(searchParams.get("offset")) : 0,
	);

	const { data, error, isLoading } = useGetPokemonsQuery({ type: selectType, limit, offset });
	const errorMessage = (error as Error)?.data;

	useEffect(() => {
		!!searchParams.get("type") ? onChangeSelect(searchParams.get("type")) : onChangeSelect("all");
	}, []);

	const onChangeSelect = (value: any) => {
		setSelectType(value);

		if (value !== "all") {
			searchParams.delete("limit");
			searchParams.delete("offset");
			setSearchParams(searchParams);
			setSearchParams({ type: value });
		} else {
			searchParams.delete("type");
			setSearchParams(searchParams);
		}
	};

	const pagination = !searchParams.get("type") &&
		selectType === "all" && {
			pageSizeOptions: [5, 10, 15, 20, 50, 100],
			pageSize: limit,
			current: offset / limit + 1,
			total: data?.count || 0,
			onChange: (page: number, pageSize: number) => {
				if (pageSize) {
					setLimit(pageSize);
					searchParams.set("limit", String(pageSize));
					setSearchParams(searchParams);
				}
				if (pageSize * (page - 1) != offset) {
					let newOffset = pageSize * (page - 1);
					setOffset(newOffset);
					searchParams.set("offset", String(newOffset));
					setSearchParams(searchParams);
				}
			},
		};

	return (
		<Layout className={styles.layout}>
			<Header className={styles.header}>
				<Title>{TEXT_DATA.pokemons}:</Title>
				<div className={styles.typeSelect}>
					<Text strong>{TEXT_DATA.pokemonType}:</Text>
					{!typesData.isLoading && typesData.data && (
						<Select
							value={selectType}
							style={{ width: 120 }}
							onChange={onChangeSelect}
							options={typesData.data}
						/>
					)}
				</div>
			</Header>
			<Content className={styles.content}>
				{!isLoading && !!data && (
					<List
						className={styles.pokemonsList}
						itemLayout="horizontal"
						size="large"
						dataSource={data?.data as []}
						pagination={pagination}
						renderItem={(item: string) => (
							<List.Item key={item} actions={[<Link to={"/pokemon/" + item}>more</Link>]}>
								<List.Item.Meta
									title={
										<Link to={"/pokemon/" + item}>{item[0].toUpperCase() + item.slice(1)}</Link>
									}
								/>
							</List.Item>
						)}
					/>
				)}
				{isLoading && <Loader />}
				{!!error && (
					<Space direction="vertical" align="center">
						<Title level={2}>{errorMessage}</Title>
					</Space>
				)}
			</Content>
		</Layout>
	);
}
