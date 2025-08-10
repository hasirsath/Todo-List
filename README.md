
# 📝 To-Do List App — Full Stack (React + Flask + PostgreSQL)

This is a full-stack To-Do List application built with **React** (frontend), **Flask** (backend), and **PostgreSQL** (database). Users can add, update, and delete tasks. Authentication (JWT or Google Login) is planned next.

---

## 🚀 Features Implemented

### ✅ Core Functionality

* Add new todos
* Edit/update existing todos
* Delete individual todos
* Show list of all todos
* Persistent storage using PostgreSQL

---

## ⚛️ React Features Learned

### 🧠 `useState` Hook

* Manage form input and todos state dynamically.
* Reactively update UI on adding/deleting/updating todos.

### 🔁 `useEffect` Hook

* Fetch todos from the backend on initial component mount.
* Keep frontend in sync with backend data.

### 📦 Component Reusability

* Separated concerns using reusable components:

  * `Todos`, `TodoItem`, `AddTodo`, `Header`, `Footer`

### 💡 Props and State Flow

* Passed down data and functions via props (`onDelete`, `addTodo`, etc.)
* Learned unidirectional data flow in React.

### 🗂️ Conditional Rendering

* Displayed "No Todos to display" when the todo list is empty.

### 🗝️ `key` Prop in Lists

* Resolved React warnings by using unique keys when rendering lists.

### 🔄 Controlled Components

* Form inputs (`title`, `desc`) are controlled using state.

---

## 🌐 Backend & Database (Summary)

* Built with **Flask**, connected to **PostgreSQL**
* RESTful APIs (`GET`, `POST`, `PUT`, `DELETE`) for todos
* CORS enabled for cross-origin requests

---

## 🛡️ Coming Soon (Authentication)

* JWT-based login & registration
* Google Login using OAuth2
* Protect routes and APIs

---

## 📂 Folder Structure

```
/frontend         # React App
  └── src
      └── MyComponents
/backend          # Flask App
  └── app.py
  └── models/
      └── todo.py
```

---

## 🛠️ Tech Stack

* **Frontend**: React, Bootstrap
* **Backend**: Flask (Python)
* **Database**: PostgreSQL
* **Hosting (Planned)**: Render or Vercel

