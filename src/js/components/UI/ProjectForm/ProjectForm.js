class ProjectForm {
	static render(container) {
		const template = document.querySelector("#project-form");
		const content = template.content.cloneNode(true);
		container.appendChild(content);
	}
}

export default ProjectForm;
