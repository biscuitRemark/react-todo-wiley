import React, {useCallback, useContext, useState} from 'react';
import {TodoContext} from './../App';
import moment from "moment";

const DEFAULT_VALUE = {
  changing: false,
  updateItem: {},
}

const Todo = ({item, todos }) => {
  const setNewArr = useContext(TodoContext);
  const [state, setState] = useState(DEFAULT_VALUE);

  const handDelete = useCallback((id) => {
    setNewArr(todos.filter((item) => item.id !== id ));
  },[todos, setNewArr]);

  const handComplete = useCallback((id) => {
    setNewArr(todos.map(item => {
      if (item.id === id) {
        return {...item, completed: !item.completed}
      } else {
        return item;
      }

    }));
  },[todos]);

  const handChangeText = useCallback((e) => {
    setState((pre) => ({...pre, updateItem: {...pre.updateItem, text: e.target.value}}));
  },[state]);

  const handUpdate = useCallback(() => {
    setNewArr([...todos.filter((item) => item.id !== state.updateItem.id ), {...state.updateItem, updated: new Date(), changing: false}]);
    setState(DEFAULT_VALUE);
  },[state, todos]);

  return (
    <>
      <div className="todo">
        {!state.changing &&
          <>
            <div style={{flex: '1 1 0'}}>
              <li className={item.completed ? "todo-item completed" : "todo-item"}>{item.text}</li>
              <div className="flex" style={{ justifyContent: 'space-between', paddingTop: '100px!important'}}>
                <span className="date-created">{moment(item.created).format('h:mm:ss a, DD-MM-YY')}</span>
                {item.updated && <span className="date-created">upd: {moment(item.updated).format('h:mm:ss a, DD-MM-YY')}</span>}
              </div>
            </div>
            <div className="flex">
              <button className="change-btn" onClick={() => setState({changing: true, updateItem: item})}>
                <i className="fa fa-edit size-icon"></i>
              </button>
              <button className={item.completed ? 'complete-btn check-mark' : 'complete-btn'} onClick={() => handComplete(item.id)}>
                <i className="fa fa-check size-icon"></i>
              </button>
              <button className="trash-btn" onClick={() => handDelete(item.id)}>
                <i className="fa fa-trash size-icon"></i>
              </button>
            </div>
          </>
        }
        {state.changing &&
        <>
          <button className="trash-btn" onClick={() => setState('')}>
            <span style={{fontSize:"18px"}}>cancel</span>
          </button>
          <div>
            <input type="text" className="todo-input" value={state.updateItem.text} onChange={handChangeText}></input>
          </div>
          <div>
            <button className="trash-btn" onClick={() => handUpdate(item.id)}>
              <span style={{fontSize:"18px"}}>update</span>
            </button>
          </div>
        </>}
    </div>
    </>
  );
};

export default Todo;