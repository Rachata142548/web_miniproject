import { NextApiRequest, NextApiResponse } from 'next';

let items: { id: number; name: string; price: number; imageUrl: string }[] = [
  { id: 1, name: 'Item 1', price: 20, imageUrl: '/item1.jpg' },
  { id: 2, name: 'Item 2', price: 30, imageUrl: '/item2.jpg' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all items
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    // Add a new item
    const { name, price, imageUrl } = req.body;

    if (!name || !price || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newItem = {
      id: items.length + 1,
      name,
      price: parseFloat(price),
      imageUrl,
    };

    items.push(newItem);
    return res.status(201).json(newItem);
  }

  if (req.method === 'DELETE') {
    // Delete an item
    const { id } = req.query;

    items = items.filter((item) => item.id !== parseInt(id as string, 10));
    return res.status(200).json({ message: 'Item deleted successfully' });
  }

  if (req.method === 'PUT') {
    // Edit an item
    const { id, name, price, imageUrl } = req.body;

    if (!id || !name || !price || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    items[index] = { id, name, price: parseFloat(price), imageUrl };
    return res.status(200).json(items[index]);
  }

  // Handle unsupported methods
  res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}