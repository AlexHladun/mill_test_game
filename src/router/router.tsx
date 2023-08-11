import {createBrowserRouter} from "react-router-dom";
import StartPage from "../pages/StartPage";
import QuestionPage from "../pages/QuestionPage";
import FinalPage from "../pages/FinalPage";
import React from "react";

export const router=createBrowserRouter([{
	path: '/start',
	element: <StartPage />,
	children: [{
		path: '/game',
		element: <QuestionPage />
	}, {
		path: '/final',
		element: <FinalPage />
	}]
}])