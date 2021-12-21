import { PublishSubscribe } from "../../index";

class TodoList {
	constructor() {
		// Hey! I want to know when app data was first initiated
		PublishSubscribe.subscribe("DATA_INITIALIZED", this.update.bind(this));

		// Hey! I want to know when a todo was added!
		PublishSubscribe.subscribe("TODO_ADDED", this.update.bind(this));

		// Hey! I want to know when a todo was removed!
		PublishSubscribe.subscribe("TODO_REMOVED", this.update.bind(this));

		// Hey! I want to know when a date on a todo was set!
		PublishSubscribe.subscribe("DATE_SET", this.update.bind(this));
	}

	render(container) {
		const template = document.querySelector("#todo-list-template");
		const content = template.content.cloneNode(true);
		container.appendChild(content);

		this.domNode = document.querySelector(".inbox .list");
	}

	update({ currentProject, appData }) {
		const updatedList = appData.find(({ title }) => title === currentProject).todos;

		this.domNode.innerHTML = null;
		const df = new DocumentFragment();

		updatedList.forEach(({ title, id }) => {
			const li = document.createElement("li");
			li.classList.add("list__item");
			li.textContent = title;
			li.setAttribute("data-id", id);
			df.appendChild(li);
		});
		this.domNode.appendChild(df);
	}
}

export default TodoList;
