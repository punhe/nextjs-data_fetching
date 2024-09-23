import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiRes = await fetch('https://nest-prisma-mongo.onrender.com/users')
    if (!apiRes.ok) {
      throw new Error(`API responded with status: ${apiRes.status}`)
    }
    const data = await apiRes.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error in API route:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}