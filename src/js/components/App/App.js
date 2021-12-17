import { PublishSubscribe } from "../PublishSubscribe";

class App {
	constructor(storage) {
		this.todoList = storage.get("APP_DATA") || [];
		this.storage = storage;
	}

	addTodo(todoItem) {
		this.todoList.push(todoItem);

		//remove duplicates
		this.todoList = new Set(this.todoList);
		this.todoList = Array.from(this.todoList);

		this.storage.set("APP_DATA", this.todoList);

		console.log("Todo item saved in the storage!");
		PublishSubscribe.publish("TODO_Added", this.todoList);
	}
}

export default App;
