import React from 'react'
import CommonButton from "../../components/Button";
import {HandLogo} from "../../assets/HandLogo";
import {useNavigate} from "react-router-dom";
import './FinalPage.styles.css'
import {useSelector} from "react-redux";
import {selectTotalScore} from "../../redux/selectors";
import {useAppDispatch} from "../../utils/hooks";
import {tryAgainAction} from "../../redux/actions";
import {formatNumberWithCommas} from "../../utils";
export const FinalPage: React.FC=() => {
	const dispatch = useAppDispatch()
	const score = useSelector(selectTotalScore)
	const navigate = useNavigate()

	const handleTryAgain = () => {
		dispatch(tryAgainAction())
		navigate('/')
	}


	return (
		<div className={"FinalPage-container"}>
			<div className={"FinalPage-scoreBlock"}>
				<div className={"Hand-container"}><HandLogo /></div>
				<div className={"Score-container"}>
						<div className={"Score"}>Total score:</div>
						<h1>${formatNumberWithCommas(score)} earned</h1>
					<CommonButton title={"Try again"} handleClick={handleTryAgain}/>
				</div>
			</div>
		</div>
	)
}