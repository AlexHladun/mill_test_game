import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './index.styles.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import StartPage from "./pages/StartPage";
import QuestionPage from "./pages/QuestionPage";
import FinalPage from "./pages/FinalPage";

const container=document.getElementById('root')!;
const root=createRoot(container);


root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<StartPage />} />
					<Route path={'/game'} element={<QuestionPage />} />
					<Route path={'/final'} element={<FinalPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
