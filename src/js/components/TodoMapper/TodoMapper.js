class TodoMapper {
	static map(todoItem) {
		return {
			title: todoItem,
			dueDate: "(no date)",
		};
	}
}

export default TodoMapper;
