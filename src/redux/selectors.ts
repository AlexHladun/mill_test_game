import {RootState} from "./store";
import {createSelector} from "@reduxjs/toolkit";

const selectState = (state: RootState) => state
export const selectCurrentQuestion = createSelector(selectState, (state) => state.currentQuestion);
export const selectCurrentIndex = createSelector(selectState, (state) => state.currentIndex)
export const selectTotalScore = createSelector(selectState, (state) => state.totalScore)
export const selectNumberOfAnswers = createSelector(selectState, (state) => state.numberOfCorrectAnswers)