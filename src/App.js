import { useState } from 'react';

export default function App() {
	const [items, setItems] = useState([]);
	// const [numItems, setNumItems] = useState(0);

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
		<div className='app'>
			<Logo />
			<Form onAddItem={handleAddItem} />
			<CheckList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <span className='logo'>📝 GoCheck ✅ </span>;
}

function Form({ onAddItem }) {
	const [title, setTitle] = useState('');
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

		setTitle('');
	}

	return (
		<form className='add-form' onSubmit={handleSubmit}>
			<h3>Ada yang mau kamu catat? 🤔</h3>
			<input
				type='text'
				name=''
				id=''
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
	const [sortBy, setSortBy] = useState('input');

	const sortItems = () => {
		switch (sortBy) {
			case 'input':
				return items;
			case 'title':
				return items.slice().sort((a, b) => a.title.localeCompare(b.title));
			case 'status':
				return items.slice().sort((a, b) => Number(a.done) - Number(b.done));
			default:
				return items;
		}
	};

	const sortedItems = sortItems();

	return (
		<div className='list'>
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

			<div className='actions'>
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value='input'>Urutkan berdasarkan input</option>
					<option value='title'>Urutkan berdasarkan deskripsi</option>
					<option value='status'>Urutkan berdasarkan status</option>
				</select>
			</div>
		</div>
	);
}

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li>
			<input
				type='checkbox'
				value={item.done}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.done ? { textDecoration: 'line-through' } : {}}>
				{item.title}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function Stats({ items }) {
	if (!items.length) {
		return (
			<footer className='stats'>
				<span>📝 Yuk mulai bikin catatan!</span>
			</footer>
		);
	}

	const numItems = items.length;
	const doneItems = items.filter((item) => item.done).length;
	const percentage = Math.round((doneItems / numItems) * 100);

	return (
		<footer className='stats'>
			<span>
				{percentage === 100
					? '✅ Kamu sudah melakukannya semua'
					: `🗒️ Kamu punya ${numItems} catatan dan baru ${doneItems} yg dichecklist (${percentage}%)`}
			</span>
		</footer>
	);
}
