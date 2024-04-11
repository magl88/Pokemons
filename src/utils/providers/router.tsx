import { MainLayout } from "@/components/MainLayout/MainLayout";
import { Main, NotFound, Pokemon } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Main />,
			},
			{
				path: "/pokemon/:pokemonName",
				element: <Pokemon />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
