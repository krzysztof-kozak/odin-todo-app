# odin-todo-app

<img src="https://raw.githubusercontent.com/krzysztof-kozak/odin-todo-app/main/todo.png" style="display: block; width: 100%; margin: 50px auto;">

This is the fourth project in the [full stack JavaScript](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/todo-list) path of [The Odin Project](https://www.theodinproject.com/).

View the deployed project at [Github Pages](https://krzysztof-kozak.github.io/odin-todo-app/).


The main goal of this project was for me to practise organising my code into modules, using webpack, and utilizing web storage API to store data client-side.

---

## Design Pattern - Publish Subscribe

I have taken upon myself to practice a Publish Subscribe design pattern, sometimes also called an Observer pattern.

This pattern makes use of a PublishSubscribe component. The PublishSubscribe component helps with isolating implementation details from all the involved components. All components talk and listen to the PubSub instead of talking to / being depended on each other.

---

## Components Design.

    * PublishSubscribe:
        - isolates any implementation details from all the involved components
        - is responsible for facilitating communication between components.
        - allows components to subscribe to the events they care about.
        - broadcasts events that the interested components can listen to.
  

    * App:
        - is a main component of the app.
        - contains all app data.
        - has methods that can manipulate todo items.


    * Storage:
        - stores data using webstorage API.
        - acts as a wrapper for the localstorage API.
        - has get and set methods to update data in the storage.


    * TodoMapper:
        - acts as a helper component.
        - takes in a string and returns a properly formatted object.


    * ProjectMapper:
        - acts as a helper component.
        - takes in a string and returns a properly formatted object.


    * TodoForm
        - is a ui component.
        - only cares about rendering a todo form in the DOM.


    * ProjectForm
        - is a ui component.
        - only cares about rendering a project form in the DOM.


    * TodoList:
        - is a ui component.
        - only cares about rendering a list of todos in the DOM.
        - subscribes to events that deal with adding, removing, or changing todos.


    * ProjectList:
        - is a ui component.
        - only cares about rendering a list of projects in the DOM.
        - subscribes to events that deal with adding, removing, or changing projects.


    * Inbox
        - is a ui component
        - renders "Inox", "Today", and "This Week" projects.
        - its purpose is to separate "main" items from the custom projects.
        - subscribe to events that deal with app data initialization or chaning projects.

---

## Publish Subscribe design pattern visualisation:

<img src="https://raw.githubusercontent.com/krzysztof-kozak/odin-todo-app/main/design.svg" style="display: block; width: 100%; margin: 50px auto;">
