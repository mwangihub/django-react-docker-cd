
const objectUpdate = (currentObject, updatedObject) => {
	return {
		...currentObject, ...updatedObject
	}
}
const setItemLocalStorage = (items = []) => {
	const obj = Object.fromEntries(items);
	for (const [key, value] of Object.entries(obj)) {
		localStorage.setItem(key, value);
	}
}

const getItemLocalStorage = (items = []) => {
	const obj = {}
	if (items.length) {
		items.forEach(item => {
			obj[item] = localStorage.getItem(item)
		});
	}
	return obj
}
const removeItemLocalStorage = (items = []) => {
	if (items.length) {
		items.forEach(item => {
			localStorage.removeItem(item)
		});
	}
}


export const utils = {
	objectUpdate,
	removeItemLocalStorage,
	getItemLocalStorage,
	setItemLocalStorage,
}
