class TodoForm {
	static render(container) {
		const template = document.querySelector("#todo-form");
		const content = template.content.cloneNode(true);
		container.appendChild(content);
	}
}

export default TodoForm;
