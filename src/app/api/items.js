import { items } from "../../../data/items"; // สมมติว่ามีข้อมูลสินค้าจากไฟล์ data

export async function GET(request) {
  return new Response(JSON.stringify(items));
}

export async function POST(request) {
  const { name, price, imageUrl } = await request.json();
  const newItem = { id: items.length + 1, name, price, imageUrl };
  items.push(newItem);
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function PUT(request) {
  const updatedItem = await request.json();
  const index = items.findIndex(item => item.id === updatedItem.id);
  if (index === -1) return new Response("Item not found", { status: 404 });
  items[index] = updatedItem;
  return new Response(JSON.stringify(updatedItem));
}

export async function DELETE(request) {
  const { id } = new URL(request.url).searchParams;
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index === -1) return new Response("Item not found", { status: 404 });
  items.splice(index, 1);
  return new Response("Item deleted");
}