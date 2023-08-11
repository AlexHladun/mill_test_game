import {createAction} from "@reduxjs/toolkit";

export const startGameAction = createAction("startGame")
export const nextQuestionAction = createAction('nextQuestion')
export const tryAgainAction = createAction('tryAgain')