import React, {useEffect, useState} from "react";

import OptionCell from "../../components/OptionCell";
import './QuestionPage.styles.css'
import questions from '../../gameConfig.json'
import {useSelector} from "react-redux";
import {selectCurrentQuestion, selectCurrentIndex, selectNumberOfAnswers} from "../../redux/selectors";
import {formatNumberWithCommas, highlightReward} from "../../utils";
import {useAppDispatch} from "../../utils/hooks";
import {nextQuestionAction} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import {IQuestion} from "../../redux/mainSlice";


interface IRenderRewards {
	questions: string[]
	currentIndex: number | null
	formatNumberWithCommas: (number: number) => string
	highlightReward: (currentIndex: null | number, pos: number) => string | undefined
}

interface IRenderQuestions {
	currentQuestion: IQuestion | null,
	selectedAnswers: string[],
	isCorrectAnswers: boolean | null,
	handleSelectAnswer: (selectedOption: string) => void
}

export const QuestionPage: React.FC=() => {
	const dispatch=useAppDispatch()
	const navigate=useNavigate()
	const currentQuestion=useSelector(selectCurrentQuestion)
	const currentIndex=useSelector(selectCurrentIndex)
	const numberOfCorrectAnswers=useSelector(selectNumberOfAnswers)
	const options=currentQuestion?.options||[];

	const [selectedAnswers, setSelectedAnswers]=useState<string[]>([]);
	const [isCorrectAnswers, setIsCorrectAnswers]=useState<boolean | null>(null);

	const handleSelectAnswer=(selectedOption: string) => {
		if (selectedAnswers.length < numberOfCorrectAnswers) {
			setSelectedAnswers((prevSelected) => [...prevSelected, selectedOption]);
		}
	};

	useEffect(() => {
		if (selectedAnswers.length === 0) {
			setIsCorrectAnswers(null);
			return;
		}

		const timeoutId: NodeJS.Timeout=setTimeout(() => {
			const correctAnswers=options
				.filter((option) => selectedAnswers.includes(option.label))
				.map((option) => option.isCorrect);

			const isCorrect: boolean=correctAnswers.length === numberOfCorrectAnswers&&correctAnswers.every(item => item === true);

			setIsCorrectAnswers(isCorrect);
			if (isCorrect) {
				setTimeout(() => {
					dispatch(nextQuestionAction())
				}, 1500)
			} else {
				setTimeout(() => {
					navigate('/final')
				}, 1500)
			}
		}, 2000);

		return () => clearTimeout(timeoutId); // Очищення таймеру при зміні стану
	}, [selectedAnswers, options, numberOfCorrectAnswers, dispatch, navigate]);

	useEffect(() => {
		if (currentIndex !== null&&currentIndex < questions.questions.length) {
			setSelectedAnswers([])
		} else {
			navigate('/final')
		}
	}, [currentIndex])


	const renderQuestionOptions=(
		{
			currentQuestion,
			selectedAnswers,
			isCorrectAnswers,
			handleSelectAnswer
		}: IRenderQuestions
	) => {
		return currentQuestion?.options.map((option: {
			label: string,
			value: string,
			isCorrect: boolean
		}, index: number) => {
			const isSelected=selectedAnswers.includes(option.label);
			const isCorrect=isCorrectAnswers !== null && isSelected && isCorrectAnswers;
			const isWrong=isCorrectAnswers !== null && isSelected && !isCorrectAnswers;
			const optionCellStyles: {
				selected?: boolean;
				correct?: boolean;
				wrong?: boolean;
			}={};

			if (isSelected) {
				optionCellStyles.selected=true;
			}
			if (isCorrect) {
				optionCellStyles.selected=false
				optionCellStyles.correct=true;
			}
			if (isWrong) {
				optionCellStyles.selected=false
				optionCellStyles.wrong=true;
			}

			return (
				<OptionCell
					key={option.label}
					onClick={() => handleSelectAnswer(option.label)}
					style={optionCellStyles}
				>
					<span className={"Options-label"}>{option.label}</span>
					<span className={"Options-value"}>{option.value}</span>
				</OptionCell>
			);
		});
	};

	const renderRewards=({questions, currentIndex, highlightReward, formatNumberWithCommas}: IRenderRewards) => {
		return questions
			.map((reward: string, index: number) => {
				const rewardColor=highlightReward(currentIndex, index);
				return (
					<OptionCell
						key={reward}
						className={`Reward`}
						rewardColor={rewardColor}
					>
						<span>${formatNumberWithCommas(Number(reward))}</span>
					</OptionCell>
				);
			})
			.reverse();
	};
	return (
		<div className={"QuestionPage-container"}>
			<div className={"Question-block"}>
				<h1 className={"Question-text"}>{currentQuestion?.question}</h1>
				<div className={"Options-container"}>
					{renderQuestionOptions(
						{
							currentQuestion,
							selectedAnswers,
							isCorrectAnswers,
							handleSelectAnswer
						}
					)}
				</div>
			</div>
			<div className={"Reward-block"}>
				{renderRewards({
					questions: questions.questions.map(question => question.reward),
					currentIndex,
					highlightReward,
					formatNumberWithCommas
				})}
			</div>
		</div>

	)
}