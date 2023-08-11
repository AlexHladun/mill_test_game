import React, {Dispatch} from "react";
import {NavigateFunction, useNavigate} from 'react-router-dom'
import CommonButton from "../../components/Button";
import {HandLogo} from "../../assets/HandLogo";
import './StartPage.styles.css'
import {startGameAction} from '../../redux/actions'
import {useAppDispatch} from "../../utils/hooks";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {MainState} from "../../redux/mainSlice";

export const StartPage: React.FC=() => {
	const navigate: NavigateFunction=useNavigate()
	const dispatch: ThunkDispatch<MainState, undefined, AnyAction> & Dispatch<AnyAction>=useAppDispatch()

	const handleStartGame=(): void => {
		dispatch(startGameAction())
		navigate('/game')
	}

	return (
		<div className="StartPage-background">
			<div className="StartPage-splitBackground">
				<div className="Hand-container"><HandLogo/></div>
				<div className="Greetings-container">
					<h1 className="Greetings-text">Who wants to be a millionaire?</h1>
					<CommonButton title='Start' handleClick={handleStartGame}/>
				</div>
			</div>
		</div>
	)

}