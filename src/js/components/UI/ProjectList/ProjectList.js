import { PublishSubscribe } from "../../index";

class ProjectList {
	constructor() {
		PublishSubscribe.subscribe("PROJECT_ADDED", this.update.bind(this));
	}

	render(container) {
		const template = document.querySelector("#project-list-template");
		const content = template.content.cloneNode(true);
		container.appendChild(content);

		this.domNode = document.querySelector(".projects .list");
	}

	update(updateList) {
		console.log("updated!");
		console.log(this);
	}
}

export default ProjectList;
