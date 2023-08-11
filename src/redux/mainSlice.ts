import {createSlice} from '@reduxjs/toolkit';
import gameConfig from '../gameConfig.json'

export interface IQuestion {
	question: string
	reward: string
	options: { label: string, value: string, isCorrect: boolean }[]
}

export interface MainState {
	numberOfCorrectAnswers: number
	allQuestions: IQuestion[]
	currentQuestion: IQuestion | null
	currentIndex: number | null
	totalScore: number
}

const initialState: MainState={
	numberOfCorrectAnswers: gameConfig.numberOfCorrectAnswers,
	allQuestions: gameConfig.questions,
	currentQuestion: null,
	currentIndex: null,
	totalScore: 0
};


export const mainSlice=createSlice({
	name: 'mainSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase('startGame', (state, action) => {
				state.currentIndex=0
				state.currentQuestion=state.allQuestions[ state.currentIndex ]
			})
			.addCase('nextQuestion', (state, action) => {
				if(state.currentIndex !== null) {
					state.currentIndex+=1
					state.totalScore=Number(state.allQuestions[state.currentIndex-1].reward)
					state.currentQuestion=state.allQuestions[ state.currentIndex ]
				}
			})
			.addCase('tryAgain', (state) => {
				state.allQuestions = gameConfig.questions
				state.totalScore = 0
				state.currentQuestion = null
				state.currentIndex = null
			})
	}
});


export default mainSlice.reducer;
