import "../css/reset.css";
import "../css/style.css";

import AppStorage from "./components/AppStorage";
import App from "./components/App";
import PublishSubscribe from "./components/PublishSubscribe";

const storage = new AppStorage();
const app = new App(storage);
app.render();

const form = document.querySelector("form");
form.addEventListener("submit", handleTodoSubmit);

function handleTodoSubmit(event) {
	event.preventDefault();

	const data = new FormData(form);
	const todo = data.get("todo");

	PublishSubscribe.publish("TODO_ADDED", todo);
}
