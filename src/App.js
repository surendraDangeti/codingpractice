import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const tempEl = useRef();
  const [todolist, setTodoList] = useState([]);
  const [currentEdit, setCurrentEdit] = useState([]);

  const onClickHandler = () => {
    let currentData = tempEl.current.value;
    let updatedList = [...todolist];

    if (currentEdit.length > 0) {
      let indvalue = updatedList.indexOf(currentEdit);
      updatedList[indvalue] = currentData;
      setTodoList(updatedList);
      setCurrentEdit("");
      tempEl.current.value = "";
    } else {
      if (todolist && todolist.length > 0) {
        let k = todolist.filter((item) => item == currentData);

        if (k && k.length === 0) {
          setTodoList([...todolist, currentData]);
          tempEl.current.value = "";
        }
      } else {
        setTodoList([currentData]);
        tempEl.current.value = "";
      }
    }
  };

  const editHandler = (data) => {
    tempEl.current.value = data;
    setCurrentEdit(data);
  };

  const deleteHandler = (data) => {
    let k = todolist.filter((item) => item !== data);
    setTodoList(k);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-section">
        <input ref={tempEl} placeholder="Add a task" />
        <button onClick={onClickHandler}>Add</button>
      </div>
      <div className="todo-list">
        {todolist &&
          todolist.map((item, index) => (
            <div className="list-item" key={index}>
              {item}
              <div>
                <button className="btn edit" onClick={() => editHandler(item)}>
                  ✏️
                </button>
                <button className="btn" onClick={() => deleteHandler(item)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
