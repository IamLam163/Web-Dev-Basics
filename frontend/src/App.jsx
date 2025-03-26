import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setItems(res.data));
  }, []);

  const addItem = () => {
    axios.post(API_URL, { name: newItem }).then((res) => {
      setItems([...items, res.data]);
      setNewItem("");
    });
  };

  const deleteItem = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setItems(items.filter((item) => item._id !== id));
    });
  };

  return (
    <div>
      <h1>Simple CRUD App</h1>
      <h1>Static Hello World</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <p>This button is static</p>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}{" "}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
