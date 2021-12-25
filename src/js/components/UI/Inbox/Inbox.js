import { PublishSubscribe } from "../../index";

class Inbox {
	constructor() {
		// Hey! I want to know when app data was first initialized!
		PublishSubscribe.subscribe("DATA_INITIALIZED", this.update.bind(this));

		// Hey! I want to know when an active project was swtiched!
		PublishSubscribe.subscribe("PROJECT_SWITCHED", this.update.bind(this));
	}

	render(container) {
		const template = document.querySelector("#inbox-list-template");
		const content = template.content.cloneNode(true);
		container.insertBefore(content, container.firstChild);

		this.domNode = document.querySelector("[data-id='0']");
	}

	update({ currentProject }) {
		if (currentProject === "Inbox") {
			this.domNode.classList.add("active");
		} else {
			this.domNode.classList.remove("active");
		}
	}
}

export default Inbox;
