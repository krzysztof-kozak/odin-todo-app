import "../css/reset.css";
import "../css/style.css";

// Logic components
import { App, Storage } from "./components";

// UI Components
import { Inbox, ProjectList, ProjectForm, TodoList, TodoForm } from "./components/UI";

const projectsSection = document.querySelector(".projects");
const todosSection = document.querySelector(".inbox");
const aside = document.querySelector("aside");

const inbox = new Inbox();
const projectForm = new ProjectForm();
const projectList = new ProjectList();
const todoForm = new TodoForm();
const todoList = new TodoList();

// Render UI component first
inbox.render(aside);
projectForm.render(projectsSection);
projectList.render(projectsSection);
todoList.render(todosSection);
todoForm.render(todosSection);

// Then initialize the App && Storage
const storage = new Storage();
const app = new App(storage);

app.initialize();
