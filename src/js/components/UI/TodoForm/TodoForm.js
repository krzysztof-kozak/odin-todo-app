class TodoForm {
	render(container) {
		const template = document.querySelector("#todo-form-template");
		const content = template.content.cloneNode(true);
		container.appendChild(content);
	}
}

export default TodoForm;
