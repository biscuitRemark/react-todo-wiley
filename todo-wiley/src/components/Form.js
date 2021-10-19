import React from 'react';

const Form = ({text, setNewText, todos, setTodos}) => {

  const handInput = (e) => {
    const value = e.target.value;
    setNewText(value);
  };

  const submitTodoHand =(e) => {
    e.preventDefault();
    if (!text) return;

    setTodos([
      ...todos,
      {
        id: Math.random() * 100,
        text: text,
        completed: false,
        changing: false,
        updated: '',
        created: new Date(),
      }
    ]);

    setNewText('');
  };

  return (
    <>
      <form>
        <input value={text} onChange={handInput} type="text" placeholder="Add a todo"/>
        <button onClick={submitTodoHand} className="todo-button todo-button" type="submit">
          <i className="fa fa-plus-square"></i>
        </button>
      </form>
    </>
  );
};

export default Form;