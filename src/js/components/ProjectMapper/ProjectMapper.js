import { v4 as uuidv4 } from "uuid";

class ProjectMapper {
	static map(project) {
		return {
			title: project,
			id: uuidv4(),
			todos: [],
		};
	}
}

export default ProjectMapper;
