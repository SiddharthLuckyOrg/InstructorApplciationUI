import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import {v4 as uuid} from 'uuid';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'todoApp.todos'
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos);
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
      const name = todoNameRef.current.value;
      alert(name);
      if(name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuid.v4(), name: name, 
          complete: false}]
      })
      todoNameRef.current.value = null;
  }
  
  return (
    <>
    <TodoList todos = {todos}/>
    <input ref = {todoNameRef} type = "text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button> CLear Completed Todos</button>
    <div>0 Left Todos</div>
    </>
  )
}

export default App;
