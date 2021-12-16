import "../css/reset.css";
import "../css/style.css";

import AppStorage from "./components/AppStorage";
import App from "./components/App";
import PublishSubscribe from "./components/PublishSubscribe";

/* 
Components:
    1. App:
        - is a main component of the app.
        - has a list of TodoItems.
        - has a render method to draw DOM elements.
        - has an add/remove method to add/remove TodoItems to/from the list.
        - has an edit method to edit TodoItem details.
        - has a toggle status method to toggle TodoItem.status.

    2. Storage:
        - stores data using webstorage API.
        - acts as a wrapper for the localstorage API.
        - has get and set methods to update data in the storage.

    3. TodoItem:
        - has title, description, duedate, completed properites.

    4. PubSub:
        - isolates any implementation details from all the involved components
        - is responsible for communication between components.
        - allows components to subscribe to the events they care about.
        - broadcasts events to the interested subscribers.
*/

const storage = new AppStorage();
const app = new App(storage);
app.render();

app.addTodo({ name: "joe", age: 50, married: true });
PublishSubscribe.publish("TODO_ADDED", { name: "joe", age: 50, married: true });
