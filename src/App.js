import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <CheckList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <span className="logo">📝 GoCheck ✅ </span>;
}

function Form({ onAddItem }) {
  const [title, setTitle] = useState("");
  // const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);

    if (!title) return;

    const newItem = {
      id: Date.now(),
      title,
      done: false,
    };
    console.log(newItem);

    onAddItem(newItem);

    setTitle("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Ada yang mau kamu catat? 🤔</h3>
      <input
        type="text"
        name=""
        id=""
        value={title}
        onChange={(e) => {
          console.log(e.target);
          setTitle(e.target.value);
        }}
      />
      <button>add</button>
    </form>
  );
}

function CheckList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.done}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.done ? { textDecoration: "line-through" } : {}}>
        {item.title}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <span>🗒️ Kamu punya x catatan dan baru x yg dichecklist (x%) ✅</span>
    </footer>
  );
}
