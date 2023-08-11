import React from 'react'
import './Button.styles.css'


interface ICommonButton {
	title: string
	handleClick: () => void
}
export const CommonButton: React.FC<ICommonButton>=({title, handleClick}) => {

	return (
		<div className={"button-container"}>
			<button onClick={handleClick}>{title}</button>
		</div>
	)
}