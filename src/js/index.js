import "../css/reset.css";
import "../css/style.css";

// UI Components
import { TodoList } from "./components/UI";

// Logic Components
import { App, Storage, TodoMapper } from "./components";

const storage = new Storage();
const app = new App(storage);
const todoList = new TodoList(app.todoList);

todoList.render(app.todoList);

const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.addEventListener("submit", handleTodoSubmit);
ul.addEventListener("click", handleTodoClick);

function handleTodoSubmit(event) {
	event.preventDefault();

	const data = new FormData(form);
	const todo = data.get("todo");

	const formattedTodo = TodoMapper.map(todo);
	app.addTodo(formattedTodo);

	form.reset();
}

function handleTodoClick({ target }) {
	const clickedNode = target.nodeName;

	if (clickedNode !== "LI" && clickedNode !== "SPAN") {
		return;
	}

	if (clickedNode === "LI") {
		const id = target.dataset.id;
		app.removeTodo(id);
		return;
	}

	if (clickedNode === "SPAN") {
		const currentTodo = target.closest("li");
		const dateInput = currentTodo.querySelector("input");

		target.classList.add("hidden");
		dateInput.classList.remove("hidden");

		const id = currentTodo.dataset.id;
		dateInput.addEventListener("change", app.setTodoDate.bind(app, id));
	}
}
