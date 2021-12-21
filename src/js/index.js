import "../css/reset.css";
import "../css/style.css";

// Logic components
import { App, Storage } from "./components";

// UI Components
import { ProjectList, ProjectForm, TodoList, TodoForm } from "./components/UI";

const aside = document.querySelector("aside");
const inbox = document.querySelector(".inbox");

const projectForm = new ProjectForm();
const projectList = new ProjectList();
const todoForm = new TodoForm();
const todoList = new TodoList();

// Render UI component first
projectForm.render(aside);
projectList.render(aside);
todoList.render(inbox);
todoForm.render(inbox);

// Then initialize the App && Storage
const storage = new Storage();
const app = new App(storage);

app.initialize();

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
