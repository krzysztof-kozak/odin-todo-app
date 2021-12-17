import { v4 as uuidv4 } from "uuid";

class TodoMapper {
	static map(todoItem) {
		return {
			title: todoItem,
			dueDate: "(no date)",
			id: uuidv4(),
		};
	}
}

export default TodoMapper;
