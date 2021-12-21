class ProjectForm {
	render(container) {
		const template = document.querySelector("#project-form-template");
		const content = template.content.cloneNode(true);
		container.appendChild(content);
	}
}

export default ProjectForm;
