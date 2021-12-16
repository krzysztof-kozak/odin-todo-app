import PublishSubscribe from "./PublishSubscribe";

class App {
	constructor(storage) {
		this.todoList = [];
		this.storage = storage || [];
	}

	render() {
		PublishSubscribe.subscribe("TODO_ADDED", this.logInfo);
	}

	logInfo(data) {
		console.log(`This TODO has been added just now: ${JSON.stringify(data)}`);
	}

	addTodo(todoItem) {
		this.todoList.push(todoItem);
		this.storage.set("APP_DATA", this.todoList);
		console.log("todo fired!");
	}

	removeTodo() {}

	editTodo() {}
	toggleTodoStatus() {}
}

export default App;
