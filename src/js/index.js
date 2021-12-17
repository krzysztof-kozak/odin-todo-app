import "../css/reset.css";
import "../css/style.css";

// UI Components
import { TodoList } from "./components/UI";

// Logic Components
import { App, Storage, PublishSubscribe } from "./components";

const storage = new Storage();
const app = new App(storage);
const todoList = new TodoList(app.todoList);

todoList.render(app.todoList);

const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.addEventListener("submit", handleTodoSubmit);
ul.addEventListener("click", handleTodoRemoval);

function handleTodoSubmit(event) {
	event.preventDefault();

	const data = new FormData(form);
	const todo = data.get("todo");
	app.addTodo(todo);

	// Hey! I just want everybody to know that a todo was added!
	PublishSubscribe.publish("TODO_ADDED", app.todoList);

	form.reset();
}
function handleTodoRemoval({ target }) {
	if (target.nodeName !== "LI") {
		return;
	}

	app.removeTodo(target.textContent);

	// Hey! I just want everybody to know that a todo was removed!
	PublishSubscribe.publish("TODO_REMOVED", app.todoList);
}
