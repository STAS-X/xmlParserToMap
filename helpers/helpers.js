export const removeNSFromElementName = (value) => {
	return value.lastIndexOf(':') > -1 ? value.slice(value.lastIndexOf(':') + 1) : value;
};

export const valueFromTextAttribute = (value, parentElement) => {
	if (Object.keys(parentElement._parent).length > 0) {
		const count = Object.keys(parentElement._parent).length - 1;
		const keyName = Object.keys(parentElement._parent)[count];
		parentElement._parent[keyName] = Number(value) ? Number(value) : value;
	}
	return parentElement;
};

