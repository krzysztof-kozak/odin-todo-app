class ProjectList {
	render(container) {
		const template = document.querySelector("#project-list-template");
		const content = template.content.cloneNode(true);
		container.appendChild(content);
	}
}

export default ProjectList;
