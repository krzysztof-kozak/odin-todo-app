import { isToday, isThisWeek } from "date-fns";
import { PublishSubscribe } from "../PublishSubscribe";
import { TodoMapper } from "../TodoMapper";
import { ProjectMapper } from "../ProjectMapper";

class App {
	constructor(storage) {
		this.inbox = { title: "Inbox", id: 0, todos: [] };
		this.today = { title: "Today", id: 1, todos: [] };
		this.thisWeek = { title: "This Week", id: 2, todos: [] };

		this.currentProject = "Inbox";

		this.storage = storage;
		this.appData = storage.get("APP_DATA") || [this.inbox, this.today, this.thisWeek];

		this.isMenuOpen = false;

		// Hey! I just want everybody to know that the app data was initialized!
		PublishSubscribe.publish("DATA_INITIALIZED", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	addTodo(todoItem) {
		// don't allow adding empty tasks
		if (!todoItem.title) {
			return;
		}

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

	removeTodo(idToRemove) {
		// Remove all instances of the todo with the idToRemove
		this.appData.forEach((project) => {
			project.todos = project.todos.filter(({ id }) => {
				return id !== idToRemove;
			});
		});

		this.storage.set("APP_DATA", this.appData);

		// Hey! I just want everybody to know that a todo was added!
		PublishSubscribe.publish("TODO_REMOVED", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	setTodoDate(targetId, { target }) {
		const newDate = target.value;

		// Project from which the todo with targetId originated
		const project = this.appData.find(({ title }) => title === this.currentProject);

		// Update the date for that todo
		const todo = project.todos.find(({ id }) => id === targetId);
		todo.dueDate = newDate;

		// If that todo has due date today, add it to the Today's list
		if (isToday(new Date(todo.dueDate))) {
			this.updateTodayInbox(todo, project.title);
		}

		// If that todo has due date this week, add it the the This Week's list
		if (isThisWeek(new Date(todo.dueDate))) {
			this.updateThisWeekInbox(todo, project.title);
		}

		// Update the date for all instances of that todo
		this.appData.forEach((project) => {
			project.todos.forEach(({ id, dueDate }) => {
				if (id === targetId) {
					dueDate = newDate;
				}
			});
		});

		this.storage.set("APP_DATA", this.appData);

		// Hey! I just want everybody to know that a todo date was set!
		PublishSubscribe.publish("DATE_SET", {
			currentProject: this.currentProject,
			appData: this.appData,
		});
	}

	updateTodayInbox(todo, fromProject) {
		const todosForToday = this.appData.find(({ title }) => title === "Today").todos;

		const isDuplicate = todosForToday.some(({ id }) => todo.id === id);
		if (isDuplicate) {
			return;
		}

		todo.fromProject = fromProject;
		todosForToday.push(todo);
	}

	updateThisWeekInbox(todo, fromProject) {
		const todosForThisWeek = this.appData.find(({ title }) => title === "This Week").todos;

		const isDuplicate = todosForThisWeek.some(({ id }) => todo.id === id);
		if (isDuplicate) {
			return;
		}

		todo.fromProject = fromProject;
		todosForThisWeek.push(todo);
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

	closeDateInputs(currentTarget) {
		const unclosedDateInputs = document.querySelectorAll(".date-input:not(.hidden)");

		unclosedDateInputs.forEach((input) => {
			const todo = input.closest(".list__item");
			const dateP = todo.querySelector(".date-paragraph");

			if (dateP === currentTarget) {
				return;
			}

			input.classList.add("hidden");
			dateP.classList.remove("hidden");
		});
	}

	handleTodoSubmit(event) {
		event.preventDefault();
		const data = new FormData(this.todoForm);
		const todo = data.get("todo");
		const formattedTodo = TodoMapper.map(todo);
		this.addTodo(formattedTodo);
		this.todoForm.reset();
	}

	handleProjectSubmit(event) {
		event.preventDefault();
		const data = new FormData(this.projectForm);
		const project = data.get("project");
		const formattedProject = ProjectMapper.map(project);
		this.addProject(formattedProject);
		this.projectForm.reset();
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

	handleTodoClick({ target }) {
		const todo = target.closest("li");
		if (!todo) {
			return;
		}
		const id = todo.dataset.id;
		const role = target.dataset.role;

		switch (role) {
			case "check-button":
				this.removeTodo(id);
				break;

			case "date":
				const dateInput = todo.querySelector(".date-input");
				dateInput.classList.remove("hidden");
				dateInput.addEventListener("change", this.setTodoDate.bind(this, id));

				target.classList.add("hidden");
				break;

			default:
				break;
		}
	}

	handleDocumentClick({ target }) {
		if (target.classList.contains("date-input")) {
			return;
		}

		this.closeDateInputs(target);
	}

	handleMenuClick() {
		if (!this.isMenuOpen) {
			this.app.classList.add("mobile-layout");
			this.main.classList.add("span-rows-3-4");
			this.asideWrapper.classList.add("menu-open");
		} else {
			this.app.classList.remove("mobile-layout");
			this.main.classList.remove("span-rows-3-4");
			this.asideWrapper.classList.remove("menu-open");
		}
		this.isMenuOpen = !this.isMenuOpen;
	}

	initialize() {
		this.app = document.querySelector(".app");
		this.main = document.querySelector(".main");
		this.asideWrapper = document.querySelector(".aside-wrapper");

		this.todoForm = document.querySelector("#todo-form");
		this.projectForm = document.querySelector("#project-form");
		this.todos = document.querySelector(".inbox .list");
		this.projects = document.querySelector("aside");
		this.menuBtn = document.querySelector(".menu__button");

		this.todoForm.addEventListener("submit", this.handleTodoSubmit.bind(this));
		this.projectForm.addEventListener("submit", this.handleProjectSubmit.bind(this));
		this.todos.addEventListener("click", this.handleTodoClick.bind(this));
		this.projects.addEventListener("click", this.handleProjectClick.bind(this));

		this.menuBtn.addEventListener("click", this.handleMenuClick.bind(this));
		document.addEventListener("click", this.handleDocumentClick.bind(this));
	}
}

export default App;
