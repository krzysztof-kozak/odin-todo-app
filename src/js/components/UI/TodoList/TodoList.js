import { isThisWeek } from "date-fns";
import isToday from "date-fns/isToday";
import { PublishSubscribe } from "../../index";

class TodoList {
	constructor() {
		// Hey! I want to know when app data was first initilized!
		PublishSubscribe.subscribe("DATA_INITIALIZED", this.update.bind(this));

		// Hey! I want to know when a todo was added!
		PublishSubscribe.subscribe("TODO_ADDED", this.update.bind(this));

		// Hey! I want to know when a todo was removed!
		PublishSubscribe.subscribe("TODO_REMOVED", this.update.bind(this));

		// Hey! I want to know when a date on a todo was set!
		PublishSubscribe.subscribe("DATE_SET", this.update.bind(this));

		// Hey! I want to know when an active project was swtiched!
		PublishSubscribe.subscribe("PROJECT_SWITCHED", this.update.bind(this));
	}

	render(container) {
		const template = document.querySelector("#todo-list-template");
		const content = template.content.cloneNode(true);
		container.appendChild(content);

		this.domNode = document.querySelector(".inbox .list");
	}

	update({ currentProject, appData }) {
		const todoForm = document.querySelector("#todo-form");
		let updatedTodos = appData.find(({ title }) => title === currentProject).todos;

		switch (currentProject) {
			case "Today":
				updatedTodos = updatedTodos.filter(({ dueDate }) => isToday(new Date(dueDate)));
				todoForm.style.display = "none";
				break;

			case "This Week":
				updatedTodos = updatedTodos.filter(({ dueDate }) => isThisWeek(new Date(dueDate)));
				todoForm.style.display = "none";
				break;

			default:
				todoForm.style.display = "flex";
				break;
		}

		this.domNode.innerHTML = null;
		const df = new DocumentFragment();

		const title = document.createElement("h2");
		title.classList.add("inbox__title");
		title.textContent = currentProject;

		df.appendChild(title);

		updatedTodos.forEach(({ title, id, dueDate, fromProject }) => {
			const li = document.createElement("li");
			li.classList.add("list__item");
			li.setAttribute("data-id", id);
			const checkBtn = document.createElement("div");
			checkBtn.classList.add("check-btn");
			checkBtn.setAttribute("data-role", "check-button");

			const titleP = document.createElement("p");
			titleP.textContent = title;

			const dateP = document.createElement("p");
			dateP.setAttribute("data-role", "date");
			dateP.classList.add("date-paragraph");
			dateP.textContent = dueDate;

			const dateInput = document.createElement("input");
			dateInput.setAttribute("type", "date");
			dateInput.classList.add("hidden", "date-input");

			const container = document.createElement("div");
			container.classList.add("title-container");
			container.appendChild(checkBtn);
			container.appendChild(titleP);

			if ((fromProject && currentProject == "Today") || currentProject == "This Week") {
				const projectP = document.createElement("p");
				projectP.textContent = `(from: ${fromProject})`;
				projectP.style.color = "hsl(207deg 90% 54%)";
				container.appendChild(projectP);
			}

			li.appendChild(container);
			li.appendChild(dateP);
			li.appendChild(dateInput);

			df.appendChild(li);
		});

		this.domNode.appendChild(df);
	}
}

export default TodoList;
