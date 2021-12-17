import { PublishSubscribe } from "../PublishSubscribe";

class Storage {
	constructor() {
		this.storage = localStorage;
	}

	get(key) {
		const data = localStorage.getItem(key);
		const formattedData = JSON.parse(data);
		return formattedData;
	}

	set(key, value) {
		const formattedValue = JSON.stringify(value);
		localStorage.setItem(key, formattedValue);
	}
}

export default Storage;
