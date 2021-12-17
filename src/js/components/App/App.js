import { PublishSubscribe } from "../PublishSubscribe";

class App {
	constructor(storage) {
		this.todoList = storage.get("APP_DATA") || [];
		this.storage = storage;
	}

	addTodo(todoItem) {
		// don't add duplicate task
		const isDuplicate = this.todoList.some(({ title }) => todoItem.title === title);
		if (isDuplicate) {
			return;
		}

		this.todoList.push(todoItem);
		this.storage.set("APP_DATA", this.todoList);

		// Hey! I just want everybody to know that a todo was added!
		PublishSubscribe.publish("TODO_ADDED", this.todoList);
	}

	removeTodo(id) {
		this.todoList = this.todoList.filter((item) => item.id !== id);
		this.storage.set("APP_DATA", this.todoList);

		// Hey! I just want everybody to know that a todo was added!
		PublishSubscribe.publish("TODO_REMOVED", this.todoList);
	}

	setTodoDate(id, { target }) {
		const newDate = target.value;
		const todo = this.todoList.find((todo) => todo.id === id);
		todo.dueDate = newDate;
		this.storage.set("APP_DATA", this.todoList);

		// Hey! I just want everybody to know that a date was set!
		PublishSubscribe.publish("DATE_SET", this.todoList);
	}
}

export default App;
