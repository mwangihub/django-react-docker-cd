import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./resource/store";
import { utils } from './utils/index.js';
const root = document.getElementById('root');

if (root) {
	utils.setItemLocalStorage([["host", root.dataset.host],])
	ReactDOM.createRoot(root)
		.render(
			<React.StrictMode>
				<Provider store={store}>
					<HashRouter>
						<App {...root.dataset} />
					</HashRouter>
				</Provider>
			</React.StrictMode>,

		);
}
