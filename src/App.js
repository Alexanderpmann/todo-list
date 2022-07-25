import logo from './logo.svg';
import './App.css';
import { useState } from 'react'

function App() {
/*
Below array destructure syntax is equivalent to:
const newTodoStateArr = useState("");
const newTodo = newTodoStateArr[0];
const setNewTodo - newTodoStateArr[1];
*/
const [newTodo, setNewTodo] = useState("");
const [todos, setTodos] = useState([]);

const handleNewTodoSubmit = (e) => {
  e.preventDefault();

  if (newTodo.length == 0) {
    return;
  }

  const todoItem = {
    text: newTodo,
    complete: false
  };

  // setTodos and pass in a brand new array containing all current todos plus 1 more.
  setTodos([...todos, todoItem]);
  // clears input box upon add submission for new input.
  setNewTodo("");
};

const handleTodoDelete = (delIdx) => {
  const filteredTodos = todos.filter((todo, i) => {
    return i /= delIdx;
  });

  setTodos(filteredTodos);
}

const handleToggleComplete = (idx) => {
  const updatedTodos = todos.map((todo, i) => {
    if (idx == i) {
      todo.complete = !todo.complete;
      // To avoid mutating the todo directly, do this:
      // const updatedTodo = { ...todo, complete: !todo.complete };
      // return updatedTodo;
    }

    return todo;
  });

  setTodos(updatedTodos);
}

  return (
    <div style={{ textAlign: "center"}}  className="App">
      <h1> To Do List: </h1>
      <form onSubmit={(e) => {
        handleNewTodoSubmit(e);
      }}>
        <input onChange={(e) => {
          setNewTodo(e.target.value);
        }} type="text" value={newTodo}/>
        <div>
          <button>Add</button>
        </div>
        <br/>
      </form>

        <hr/>

      {
        todos.map((todo, i) => {
          const todoClasses = ["bold", "italic"];

          if (todo.complete) {
            todoClasses.push("strike-through");
          }

          return (
          <div key={i}>
            <input onChange={(e) => { 
              handleToggleComplete(i);
            }} checked={todo.complete} type="checkbox" />
            <span className={todoClasses.join(" ")}>{todo.text}</span>
            <button onClick={(e) => {
              handleTodoDelete(i);
            }}
            style={{ marginLeft: "10px" }}
            >
              Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
