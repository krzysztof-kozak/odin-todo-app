import { PublishSubscribe } from "../PublishSubscribe";

class App {
	constructor(storage) {
		this.todoList = [];
		this.storage = storage || [];
	}

	render() {
		PublishSubscribe.subscribe("TODO_ADDED", this.addTodo.bind(this));
	}

	logInfo(data) {
		console.log(`I hear that a new todo item has just been submitted: ${JSON.stringify(data)}`);
	}

	addTodo(todoItem) {
		this.todoList.push(todoItem);
		this.storage.set("APP_DATA", this.todoList);
		console.log("Todo item saved in the storage!");
	}

	removeTodo() {}

	editTodo() {}
	toggleTodoStatus() {}
}

export default App;
