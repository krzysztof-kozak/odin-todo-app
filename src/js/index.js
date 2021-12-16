import "../css/reset.css";
import "../css/style.css";

import AppStorage from "./components/AppStorage";

/* 
Components:
    1. App:
        - is a main component of the app.
        - has a list of TodoItems.
        - has a render method to draw DOM elements.
        - has an add/remove method to add/remove TodoItems to/from the list.

    2. Storage:
        - stores data using webstorage API.
        - acts as a wrapper for the localstorage API.
        - has get and set methods to update data in the storage.

    3. TodoItem:
        - has title, description, duedate, completed properites.
        - has an edit method to update the details.
        - has a toggleComplete method to toggle completed status.


    4. PubSub:
        - isolates any implementation details from all the involved components
        - is responsible for communication between components.
        - allows components to subscribe to the events they care about.
        - broadcasts events to the interested subscribers.
*/

const storage = new AppStorage();
storage.set("APP_DATA", { name: "kris", age: 30, isMarried: false });
console.log(storage.get("APP_DATA"));
