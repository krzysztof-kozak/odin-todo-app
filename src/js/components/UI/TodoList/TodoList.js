import { PublishSubscribe } from "../../index";

class TodoList {
	constructor() {
		// Hey! I want to know when a todo was added!
		PublishSubscribe.subscribe("TODO_ADDED", this.render);

		// Hey! I want to know when a todo was removed!
		PublishSubscribe.subscribe("TODO_REMOVED", this.render);

		// Hey! I want to know when a date was set!
		PublishSubscribe.subscribe("DATE_SET", this.render);
	}

	render(todos) {
		const list = document.querySelector("ul");
		list.innerHTML = "";

		const df = new DocumentFragment();

		todos.forEach((todo) => {
			const li = document.createElement("li");
			const span = document.createElement("span");
			const input = document.createElement("input");

			li.textContent = todo.title;
			li.setAttribute("data-id", todo.id);

			input.setAttribute("type", "date");
			input.classList.add("hidden");

			span.textContent = todo.dueDate;

			li.appendChild(span);
			li.appendChild(input);

			df.appendChild(li);
		});

		list.appendChild(df);
	}
}

export default TodoList;
