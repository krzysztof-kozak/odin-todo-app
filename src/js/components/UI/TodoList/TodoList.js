import { PublishSubscribe } from "../../index";

class TodoList {
	constructor() {
		// Hey! I want to know when a todo was added!
		PublishSubscribe.subscribe("TODO_ADDED", this.render);
	}

	render(todos) {
		const list = document.querySelector("ul");
		list.innerHTML = "";

		const df = new DocumentFragment();

		todos.forEach((todo) => {
			const li = document.createElement("li");
			li.textContent = todo;
			df.appendChild(li);
		});

		list.appendChild(df);
	}
}

export default TodoList;
