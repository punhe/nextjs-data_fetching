import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiRes = await fetch('https://nest-prisma-mongo.onrender.com/users')
    const data = await apiRes.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}