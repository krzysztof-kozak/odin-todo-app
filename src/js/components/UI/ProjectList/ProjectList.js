class ProjectList {
	static render(container) {
		const template = document.querySelector("#project-list");
		const content = template.content.cloneNode(true);
		container.appendChild(content);
	}
}

export default ProjectList;
