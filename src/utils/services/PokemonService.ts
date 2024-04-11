import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/api";
import { PokemonType, Pokemons, PokemonsResult, TypePokemon } from "@/utils/types";

export const pokemonAPI = createApi({
	reducerPath: "pokemonAPI",
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getPokemonByNameOrId: builder.query({
			query: (name) => ({ url: `/pokemon/${name}` }),
		}),
		getPokemons: builder.query({
			query: ({ type, limit, offset }) => ({
				url: !!type && type != "all" ? `/type/${type}` : `/pokemon`,
				params:
					!!type && type != "all"
						? undefined
						: {
								limit,
								offset,
							},
			}),
			transformResponse: (response: PokemonType | Pokemons) => {
				let count: number;
				let data: string[];

				if ("count" in response) {
					count = response.count;
					data = response?.results.map((i: PokemonsResult) => i.name);
				} else {
					count = response.pokemon.length;
					data = response.pokemon.map((i: TypePokemon) => i.pokemon.name);
				}

				return {
					count,
					data,
				};
			},
		}),
	}),
});

export const { useGetPokemonByNameOrIdQuery, useGetPokemonsQuery } = pokemonAPI;
