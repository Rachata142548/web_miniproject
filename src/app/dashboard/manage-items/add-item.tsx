import { useState } from "react";

export default function AddItem() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !imageUrl || !price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify({ name, imageUrl, price }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        alert("Item added successfully!");
      } else {
        alert(data.error || "Failed to add item.");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding item.");
    }
  };

  return (
    <div>
      <h1>Add New Item</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}