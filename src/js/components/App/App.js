import { PublishSubscribe } from "../PublishSubscribe";

class App {
	constructor(storage) {
		this.todoList = storage.get("APP_DATA") || [];
		this.storage = storage;
	}

	addTodo(todoItem) {
		if (!todoItem) {
			return;
		}

		this.todoList.push(todoItem);

		//remove duplicates
		this.todoList = new Set(this.todoList);
		this.todoList = Array.from(this.todoList);

		this.storage.set("APP_DATA", this.todoList);
		PublishSubscribe.publish("TODO_ADDED", this.todoList);
	}

	removeTodo(id) {
		this.todoList = this.todoList.filter((item) => item.id !== id);
		this.storage.set("APP_DATA", this.todoList);
		PublishSubscribe.publish("TODO_REMOVED", this.todoList);
	}
}

export default App;
