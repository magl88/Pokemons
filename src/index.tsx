import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router, setupStore } from "@/utils/providers";
import { TEXT_DATA } from "./utils/constants";

import "@/index.css";

const container = document.getElementById("root");

if (!container) {
	throw new Error(TEXT_DATA.containerNotFound);
}

const root = createRoot(container);

const store = setupStore();

root.render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
