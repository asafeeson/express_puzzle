export function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function getRandomInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}
