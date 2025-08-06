import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import Footer from "./MyComponents/Footer";
import React, { useState, useEffect } from 'react';
import AddTodo from "./MyComponents/AddTodo";



function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = (title, desc) => {
    const newTodo = { title, desc };
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]))
      .catch((error) => console.error("Error adding todo:", error));
  };

  const onDelete = (todo) => {
    fetch(`http://localhost:5000/todos/${todo.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((e) => e.id !== todo.id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const updateTodo = (id, title, desc) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, desc }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, title, desc } : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error updating todo:", error));
  };
  
  return (
    <>
      <Header title="My Todos" />
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} onUpdate={updateTodo}/>
      <Footer />
    </>
  );
}

export default App;
