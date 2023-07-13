import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <CheckList items={items} />
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

function CheckList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.done ? { textDecoration: "line-through" } : {}}>
        {item.title}
      </span>
      <button>❌</button>
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
