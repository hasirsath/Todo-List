import React from 'react'
import {TodoItem} from "./TodoItem";

export const Todos = (props) => {
  return (
    <div className="container" style={{minHeight: "70vh"}}  >
      <h3 className=" my-3">Todos List</h3>
      {props.todos.length === 0 ? "No Todos to display" :
        props.todos.map((todo)=>{
          return (
            <div key={todo.id}>
          <>        
          
             <TodoItem todo={todo}  onDelete={props.onDelete} onUpdate={props.onUpdate} /><hr/>
          </>
          </div>
        )
        
      })
    }
    </div>
  );
};


