import React from 'react';
import Todo from "./Todo";

const TodoList = ({arrTodos}) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {arrTodos.map((item) => (
            <Todo key={item.id} item={item} todos={arrTodos}/>
          )
        )}
      </ul>
    </div>
  );
};

export default TodoList;