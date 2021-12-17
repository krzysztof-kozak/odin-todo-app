class PublishSubscribe {
	static events = {};

	static subscribe(eventName, functionRef) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		this.events[eventName].push(functionRef);
	}

	static unsubscribe(eventName, functionRef) {
		if (!this.events[eventName]) {
			return;
		}

		this.events[eventName] = this.events[eventName].filter(
			(storedFunction) => storedFunction !== functionRef
		);
	}

	static publish(eventName, data) {
		if (!this.events[eventName]) {
			return;
		}

		this.events[eventName].forEach((storedFunction) => {
			storedFunction(data);
		});
	}
}

export default PublishSubscribe;
