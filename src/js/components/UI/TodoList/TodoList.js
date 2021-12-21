import { PublishSubscribe } from "../../index";

class TodoList {
	constructor() {
		// Hey! I want to know when a todo was added!
		PublishSubscribe.subscribe("TODO_ADDED", this.render);

		// Hey! I want to know when a todo was removed!
		PublishSubscribe.subscribe("TODO_REMOVED", this.render);

		// Hey! I want to know when a date on a todo was set!
		PublishSubscribe.subscribe("DATE_SET", this.render);
	}

	static render(container) {
		const template = document.querySelector("#todo-list");
		const content = template.content.cloneNode(true);
		container.appendChild(content);
	}
}

export default TodoList;
