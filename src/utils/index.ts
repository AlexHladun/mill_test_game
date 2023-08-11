export const highlightReward=(currentIndex: number | null, index: number): string | undefined => {
	if (currentIndex !== null) {
		const range: number=currentIndex - index
		if (range > 0) {
			return 'gray';
		} else if (range < 0) {
			return 'black';
		} else {
			return 'yellow';
		}
	}
	return undefined
}

export const formatNumberWithCommas = (number: number) => {
	return number.toLocaleString('en-US');
}