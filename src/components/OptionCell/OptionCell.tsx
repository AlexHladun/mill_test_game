import React from 'react';
import './OptionCell.styles.css';

interface IOptionCell {
	children: React.ReactNode;
	className?: string;
	rewardColor?: string;
	onClick?: () => void;
	answerColor?: string;
	style?: {
		selected?: boolean;
		correct?: boolean;
		wrong?: boolean;
	};
}

export const OptionCell: React.FC<IOptionCell> = ({
											   children,
											   className = '',
											   onClick,
											   rewardColor,
	style
										   }) => {

	const optionCellClassName = [
		style?.selected ? 'selected' : '',
		style?.correct ? 'correct' : '',
		style?.wrong ? 'wrong' : '',
	].join(' ');
	const containerClass = `Container ${optionCellClassName.concat(` ${className}`)}${rewardColor ? '-' + rewardColor : ''}`;
	const beforeClass = `${optionCellClassName.concat(` ${className}`) ? optionCellClassName.concat(` ${className}`) + '-before' : 'before'}${rewardColor ? '-' + rewardColor : ''}`;

	return (
		<div className="Main-container" onClick={onClick}>
			<div className={beforeClass}></div>
			<div className={containerClass} >{children}</div>
			<div className={beforeClass}></div>
		</div>
	);
};


