import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

function App() {
  const [form, setForm] = useState({
    id: "",
    title: "",
    isDone: false,
  });
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      id: uuidv4(), // Her useEffect çağrıldığında yeni bir ID oluştur
    }));
  }, [form.title]);

  useEffect(() => {
    if (filterType === "active") {
      setFilteredTodos(() => {
        return todos.filter((todo) => !todo.isDone);
      });
    } else if (filterType === "completed") {
      setFilteredTodos(() => {
        return todos.filter((todo) => todo.isDone);
      });
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, filterType]);

  function onChangeInput(e) {
    setForm({ id: uuidv4(), title: e.target.value, isDone: false });
  }

  function onSubmit(e) {
    e.preventDefault();
    const trimmedTitle = form.title.trim(); // Girilen metni boşluklardan temizle
    const isExisting = todos.some((todo) => todo.title.trim() === trimmedTitle); // Girilen metin zaten var mı?

    if (isExisting) {
      alert("Bu todo zaten var!");
    } else {
      const newTodo = { id: uuidv4(), title: trimmedTitle, isDone: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setForm((prevForm) => ({ ...prevForm, title: "" })); // Formu sıfırla
    }
  }

  function deleteSelected(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function markAsCompleted(todoToToggle) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id == todoToToggle.id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  useEffect(() => {
    console.log(todos);
  });

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChangeInput}
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filteredTodos.map((todo, index) => {
              return (
                <>
                  {!todo.isDone && (
                    <li key={index}>
                      <div className="view">
                        <input
                          className="toggle"
                          type="checkbox"
                          onClick={() => markAsCompleted(todo)}
                        />
                        <label>{todo.title}</label>
                        <button
                          className="destroy"
                          onClick={() => deleteSelected(todo.id)}
                        ></button>
                      </div>
                    </li>
                  )}
                  {todo.isDone && (
                    <li className="completed">
                      <div className="view">
                        <input
                          className="toggle"
                          type="checkbox"
                          onClick={() => markAsCompleted(todo)}
                        />
                        <label>{todo.title}</label>
                        <button
                          className="destroy"
                          onClick={() => deleteSelected(todo.id)}
                        ></button>
                      </div>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.length} </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className="selected"
                onClick={() => {
                  setFilterType("all");
                }}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                onClick={() => {
                  setFilterType("active");
                }}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                onClick={() => {
                  setFilterType("completed");
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            className="clear-completed"
            onClick={() => {
              const newList = todos.filter((todo) => !todo.isDone);
              setTodos(newList);
            }}
          >
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
