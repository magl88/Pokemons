import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { TEXT_DATA } from "@/utils/constants";

const { Search } = Input;

interface SearchProps {
	className?: string;
}

const SearchPokemon = ({ className }: SearchProps) => {
	const [pokemon, setPokemon] = useState("");
	const navigate = useNavigate();

	const onSearch = (value: string) => {
		setPokemon("");
		navigate(`/pokemon/${value}`);
	};

	const onChange = (value: ChangeEvent<HTMLInputElement>) => setPokemon(value.target.value);

	return (
		<Search
			className={classNames([className])}
			placeholder={TEXT_DATA.pokemonName}
			value={pokemon}
			onChange={onChange}
			onSearch={onSearch}
			enterButton
		/>
	);
};

export default SearchPokemon;
