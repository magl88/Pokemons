import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/api";
import { PokemonTypes } from "../types/pokemonTypes";

export const typeAPI = createApi({
	reducerPath: "typeAPI",
	tagTypes: ["Type"],
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getTypes: builder.query({
			query: () => ({ url: "/type/" }),
			transformResponse: (response: PokemonTypes) => [
				{ value: "all", label: "All" },
				...response.results.map((item: any) => ({
					value: item.name,
					label: item.name[0].toUpperCase() + item.name.slice(1),
				})),
			],
		}),
	}),
});

export const { useGetTypesQuery } = typeAPI;
