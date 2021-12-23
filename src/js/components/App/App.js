import { PublishSubscribe } from "../PublishSubscribe";
import { TodoMapper } from "../TodoMapper";
import { ProjectMapper } from "../ProjectMapper";

class App {
	constructor(storage) {
		this.defaultProject = { title: "Inbox", id: 0, todos: [] };
		this.currentProject = "Inbox";
		this.storage = storage;
		this.appData = storage.get("APP_DATA") || [this.defaultProject];

		// Hey! I just want everybody to know that the app data was initialized!
		PublishSubscribe.publish("DATA_INITIALIZED", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	addTodo(todoItem) {
		const projectToUpdate = this.appData.find(({ title }) => title === this.currentProject);
		const todos = projectToUpdate.todos;

		// don't add duplicate tasks
		const isDuplicate = todos.some(({ title }) => todoItem.title === title);
		if (isDuplicate) {
			return;
		}

		projectToUpdate.todos.push(todoItem);
		this.storage.set("APP_DATA", this.appData);

		// Hey! I just want everybody to know that a todo was added!
		PublishSubscribe.publish("TODO_ADDED", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	removeTodo(id) {
		this.appData = this.appData.filter((item) => item.id !== id);
		this.storage.set("APP_DATA", this.appData);

		// Hey! I just want everybody to know that a todo was added!
		PublishSubscribe.publish("TODO_REMOVED", this.appData);
	}

	setTodoDate(id, { target }) {
		const newDate = target.value;
		const todo = this.appData.find((todo) => todo.id === id);
		todo.dueDate = newDate;
		this.storage.set("APP_DATA", this.appData);

		// Hey! I just want everybody to know that a date was set!
		PublishSubscribe.publish("DATE_SET", this.appData);
	}

	addProject(project) {
		// don't add duplicate projects
		const isDuplicate = this.appData.some(({ title }) => project.title === title);
		if (isDuplicate) {
			return;
		}
		this.appData.push(project);
		this.storage.set("APP_DATA", this.appData);

		// Hey! I just want everybody to know that a new project was added!
		PublishSubscribe.publish("PROJECT_ADDED", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	handleTodoSubmit(event) {
		event.preventDefault();
		const data = new FormData(this.todoForm);
		const todo = data.get("todo");
		const formattedTodo = TodoMapper.map(todo);
		this.addTodo(formattedTodo);
	}

	handleProjectSubmit(event) {
		event.preventDefault();
		const data = new FormData(this.projectForm);
		const project = data.get("project");
		const formattedProject = ProjectMapper.map(project);
		this.addProject(formattedProject);
	}

	handleProjectClick({ target }) {
		if (!target.classList.contains("list__item")) {
			return;
		}

		const title = target.textContent;
		this.currentProject = title;

		// Hey! I just want everybody to know that an active project was switched!
		PublishSubscribe.publish("PROJECT_SWITCHED", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	initialize() {
		this.todoForm = document.querySelector("#todo-form");
		this.projectForm = document.querySelector("#project-form");
		this.projects = document.querySelector(".projects .list");

		this.todoForm.addEventListener("submit", this.handleTodoSubmit.bind(this));
		this.projectForm.addEventListener("submit", this.handleProjectSubmit.bind(this));
		this.projects.addEventListener("click", this.handleProjectClick.bind(this));
	}
}

export default App;
