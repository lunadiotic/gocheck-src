function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <span>📝 Yuk mulai bikin catatan!</span>
      </footer>
    );
  }

  const numItems = items.length;
  const doneItems = items.filter((item) => item.done).length;
  const percentage = Math.round((doneItems / numItems) * 100);

  return (
    <footer className="stats">
      <span>
        {percentage === 100
          ? "✅ Kamu sudah melakukannya semua"
          : `🗒️ Kamu punya ${numItems} catatan dan baru ${doneItems} yg dichecklist (${percentage}%)`}
      </span>
    </footer>
  );
}

export default Stats;
