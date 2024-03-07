export const writeErrorToConsole = (err) => {
	if (typeof err === 'string') {
		console.error(`Во время работы программы произошла неизвестная ошибка: ${err}`);
		return;
	}

	const { name, message, stack } = err;
	if (message) {
		console.error(`Во время работы программы произошла ошибка ${name}: ${message} \n ${stack}`);
	} else console.error('Во время работы программы произошла неизвестная ошибка');
};

export const writeMessageToConsole = (message) => {
	if (message) console.log(message);
};
