import React, { useState } from 'react';

export const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDesc, setNewDesc] = useState(todo.desc);

  const handleUpdate = () => {
    onUpdate(todo.id, newTitle, newDesc);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            className="form-control mb-2"
          />
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description"
            className="form-control mb-2"
          />
          <button className="btn btn-sm btn-primary mx-1" onClick={handleUpdate}>Save</button>
          <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h5>{todo.title}</h5>
          <p>{todo.desc}</p>
          <button className="btn btn-sm btn-warning mx-1" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo)}>Delete</button>
        </>
      )}
    </div>
  );
};
