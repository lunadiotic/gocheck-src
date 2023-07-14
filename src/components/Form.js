import { useState } from "react";

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

export default Form;
