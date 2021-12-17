# odin-todo-app

## Components Design.

    * App:
        - is a main component of the app.
        - has a list of TodoItems.
        - has a render method to draw DOM elements.
        - has an add/remove method to add/remove TodoItems to/from the list.
        - has an edit method to edit TodoItem details.
        - has a toggle status method to toggle TodoItem.status.

    * Storage:
        - stores data using webstorage API.
        - acts as a wrapper for the localstorage API.
        - has get and set methods to update data in the storage.

    * Todo list:
        - is a ui components.
        - only cares about rendering a list of tasks in the DOM.
        - subscribes to events that deal with adding or removing todos

    * TodoItem:
        - has title, description, duedate, completed properites.

    * PubSub:
        - isolates any implementation details from all the involved components
        - is responsible for communication between components.
        - allows components to subscribe to the events they care about.
        - broadcasts events to the interested subscribers.
