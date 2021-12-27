import { PublishSubscribe } from "../../index";

class ProjectList {
	constructor() {
		// Hey! I want to know when app data was first initialized!
		PublishSubscribe.subscribe("DATA_INITIALIZED", this.update.bind(this));

		// Hey! I want to know when a new project was added!
		PublishSubscribe.subscribe("PROJECT_ADDED", this.update.bind(this));

		// Hey! I want to know when an active project was swtiched!
		PublishSubscribe.subscribe("PROJECT_SWITCHED", this.update.bind(this));
	}

	render(container) {
		const template = document.querySelector("#project-list-template");
		const content = template.content.cloneNode(true);
		container.appendChild(content);

		this.domNode = document.querySelector(".projects .list");
	}

	update({ currentProject, appData: projects }) {
		this.domNode.innerHTML = null;
		const df = new DocumentFragment();

		const inboxItems = ["Inbox", "Today", "This Week"];
		projects.forEach(({ title, id }) => {
			if (inboxItems.includes(title)) {
				return;
			}

			const li = document.createElement("li");
			li.classList.add("list__item");
			li.textContent = title;
			li.setAttribute("data-id", id);
			df.appendChild(li);

			if (title === currentProject) {
				li.classList.add("active");
			}
		});

		this.domNode.appendChild(df);
	}
}

export default ProjectList;
