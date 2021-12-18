import "../css/reset.css";
import "../css/style.css";

// UI Components
import { TodoList } from "./components/UI";

// Logic Components
import { App, Storage, TodoMapper } from "./components";

// const storage = new Storage();
// const app = new App(storage);
// const todoList = new TodoList(app.todoList);

// todoList.render(app.todoList);

const todoForm = document.querySelector("#todo-form");
const projectForm = document.querySelector("#project-form");
const mainTodoList = document.querySelector("#main-todo-list");

/*
projectForm.addEventListener("submit", handleProjectSubmit);
todoForm.addEventListener("submit", handleTodoSubmit);

mainTodoList.addEventListener("click", handleTodoClick);
document.addEventListener("click", hideUnclosedDateInputs, true);
*/

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
		hideUnclosedDateInputs();

		const currentTodo = target.closest("li");
		const dateInput = currentTodo.querySelector("input");

		target.classList.add("hidden");
		dateInput.classList.remove("hidden");

		const id = currentTodo.dataset.id;
		dateInput.addEventListener("change", app.setTodoDate.bind(app, id));
	}
}

function hideUnclosedDateInputs(event) {
	let dateInputs = document.querySelectorAll("input[type='date']");
	const dateSpans = document.querySelectorAll("span");

	if (event) {
		dateInputs = [...dateInputs].filter((input) => input !== event.target);
	}

	dateInputs.forEach((input) => input.classList.toggle("hidden", true));
	dateSpans.forEach((span) => span.classList.toggle("hidden", false));
}

function handleProjectSubmit(event) {
	event.preventDefault();

	const data = new FormData(projectForm);
	const project = data.get("project");

	const section = document.createElement("section");
	section.innerHTML = `
	<h2>${project}</h2>
	<ul id="${project}"></ul>`;

	document.body.appendChild(section);

	projectForm.reset();
}
