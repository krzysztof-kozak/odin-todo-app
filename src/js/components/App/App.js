import { PublishSubscribe } from "../PublishSubscribe";
import { TodoMapper } from "../TodoMapper";
import { ProjectMapper } from "../ProjectMapper";

class App {
	constructor(storage) {
		this.currentProject = "Work";
		this.storage = storage;
		this.appData = storage.get("APP_DATA") || [];
		PublishSubscribe.publish("DATA_INITIALIZED", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	addTodo(todoItem) {
		const projectExists = this.appData.some(({ title }) => title === this.currentProject);
		if (!projectExists) {
			const formattedProject = ProjectMapper.map(this.currentProject);
			this.appData.push(formattedProject);
		}

		const projectToUpdate = this.appData.find(({ title }) => title === this.currentProject);
		const todos = projectToUpdate.todos;

		// don't add duplicate task
		const isDuplicate = todos.some(({ title }) => todoItem.title === title);
		if (isDuplicate) {
			return;
		}

		projectToUpdate.todos.push(todoItem);

		this.storage.set("APP_DATA", this.appData);

		// Hey! I just want everybody to know that a todo was added!
		PublishSubscribe.publish("TODO_ADDED", todos);
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

		PublishSubscribe.publish("PROJECT_ADDED", project);
	}

	initialize() {
		this.todoForm = document.querySelector("#todo-form");
		this.projectForm = document.querySelector("#project-form");

		this.todoForm.addEventListener("submit", this.handleTodoSubmit.bind(this));
		this.projectForm.addEventListener("submit", this.handleProjectSubmit.bind(this));
	}
}

export default App;
