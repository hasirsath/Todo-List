import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Footer from "./MyComponents/Footer";
import React, { useState, useEffect } from "react";
import AddTodo from "./MyComponents/AddTodo";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/todos", {
        headers: {
          Authorization: "Bearer ${token}",
          
        },
      })
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((error) => console.error("Error fetching todos:", error));
    }
  }, [auth]);

  const addTodo = (title, desc) => {
    const token = localStorage.getItem("token");
    const newTodo = { title, desc };
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]))
      .catch((error) => console.error("Error adding todo:", error));
  };

  const onDelete = (todo) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setTodos(todos.filter((e) => e.id !== todo.id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const updateTodo = (id, title, desc) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    <Router>
      <Header title="My Todos" auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route path="/google-login" element={<Login setAuth={setAuth} />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute auth={auth}>
              <>
                <Header title="My Todos" />
                <AddTodo addTodo={addTodo} />
                <Todos
                  todos={todos}
                  onDelete={onDelete}
                  onUpdate={updateTodo}
                />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
