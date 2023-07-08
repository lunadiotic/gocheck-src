import { useState } from "react";

const listItems = [
  { id: 1, title: "Eat", done: false },
  { id: 2, title: "Sleep", done: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <CheckList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <span className="logo">📝 GoCheck ✅ </span>;
}

function Form() {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);

    if (!title) return;

    const newItem = {
      title,
      done: false,
    };
    console.log(newItem);

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

function CheckList() {
  return (
    <div className="list">
      <ul>
        {listItems.map((item) => (
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
