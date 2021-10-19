import './App.css';
import TodoList from "./components/TodoList";
import Form from "./components/Form";
import {useState, createContext, useEffect, useCallback} from "react";

export const TodoContext = createContext();

function App() {
  const [newText, setNewText] = useState('');
  const [arrTodos, setArrTodos] = useState([]);

  const saveLocalStore = useCallback(() => {
    localStorage.setItem('todos', JSON.stringify(arrTodos));
  },[arrTodos]);


  useEffect(() => {
    let local = localStorage.getItem('todos');
    if (local) {
      setSortedTodos(JSON.parse(local));
    }

  },[]);

  function setSortedTodos(nextValue) {
    setArrTodos(nextValue.sort((a,b) => {
      if(a.text < b.text) { return 1; }
      if(a.text > b.text) { return -1; }
      return 0;
    }));
  }

  useEffect(() => {
    saveLocalStore();
  }, [arrTodos, saveLocalStore]);

  return (
    <div className="App">
      <header style={{fontSize: '40px'}}>Todo list</header>
      <main>
        <Form text={newText} setNewText={setNewText} todos={arrTodos} setTodos={setSortedTodos}/>
        <TodoContext.Provider value={setSortedTodos} >
          <TodoList arrTodos={arrTodos} />
        </TodoContext.Provider>
      </main>
    </div>
  );
}

export default App;
