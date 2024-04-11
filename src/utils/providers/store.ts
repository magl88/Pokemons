import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pokemonAPI, typeAPI } from "@/utils/services";

const rootReducer = combineReducers({
	[pokemonAPI.reducerPath]: pokemonAPI.reducer,
	[typeAPI.reducerPath]: typeAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(pokemonAPI.middleware, typeAPI.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
