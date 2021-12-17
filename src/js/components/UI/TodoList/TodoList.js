import { PublishSubscribe } from "../../index";

class TodoList {
	constructor() {
		// Hey! I want to know when a todo was added!
		PublishSubscribe.subscribe("TODO_ADDED", this.render);

		// Hey! I want to know when a todo was removed!
		PublishSubscribe.subscribe("TODO_REMOVED", this.render);
	}

	render(todos) {
		const list = document.querySelector("ul");
		list.innerHTML = "";

		const df = new DocumentFragment();

		todos.forEach((todo) => {
			const li = document.createElement("li");
			const span = document.createElement("span");

			li.textContent = todo.title;
			li.setAttribute("data-id", todo.id);
			span.textContent = todo.dueDate;

			li.appendChild(span);
			df.appendChild(li);
		});

		list.appendChild(df);
	}
}

export default TodoList;
