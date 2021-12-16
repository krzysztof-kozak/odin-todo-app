class App {
	constructor(storage) {
		this.todoList = [];
		this.storage = storage || [];
	}

	render() {}

	addTodo(todoItem) {
		this.todoList.push(todoItem);
		this.storage.set("APP_DATA", this.todoList);
	}

	removeTodo() {}

	editTodo() {}
	toggleTodoStatus() {}
}

export default App;
