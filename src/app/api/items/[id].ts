import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === 'DELETE') {
      const deletedItem = await prisma.item.delete({
        where: { id: String(id) },
      });
      res.status(200).json(deletedItem);
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}