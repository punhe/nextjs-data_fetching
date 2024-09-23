import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const url = id
      ? `https://nest-prisma-mongo.onrender.com/users/${id}`
      : 'https://nest-prisma-mongo.onrender.com/users';

    const apiRes = await fetch(url);
    if (!apiRes.ok) {
      throw new Error(`API responded with status: ${apiRes.status}`);
    }

    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}