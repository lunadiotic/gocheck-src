import { useState } from "react";
import Item from "./Item";

function CheckList({ items, onDeleteItem, onToggleItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");

  const sortItems = () => {
    switch (sortBy) {
      case "input":
        return items;
      case "title":
        return items.slice().sort((a, b) => a.title.localeCompare(b.title));
      case "status":
        return items.slice().sort((a, b) => Number(a.done) - Number(b.done));
      default:
        return items;
    }
  };

  const sortedItems = sortItems();

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan input</option>
          <option value="title">Urutkan berdasarkan deskripsi</option>
          <option value="status">Urutkan berdasarkan status</option>
        </select>
        <button onClick={onClearItems}>Clear Item</button>
      </div>
    </div>
  );
}

export default CheckList;
