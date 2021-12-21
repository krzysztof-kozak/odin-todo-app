import "../css/reset.css";
import "../css/style.css";

// Logic components
import { App, Storage } from "./components";

// UI Components
import { ProjectList, ProjectForm, TodoList, TodoForm } from "./components/UI";

const projectsSection = document.querySelector(".projects");
const inbox = document.querySelector(".inbox");

const projectForm = new ProjectForm();
const projectList = new ProjectList();
const todoForm = new TodoForm();
const todoList = new TodoList();

// Render UI component first
projectForm.render(projectsSection);
projectList.render(projectsSection);
todoList.render(inbox);
todoForm.render(inbox);

// Then initialize the App && Storage
const storage = new Storage();
const app = new App(storage);

app.initialize();
