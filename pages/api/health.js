// Health check endpoint - helps hosting providers detect Next.js
export default function handler(req, res) {
  res.status(200).json({ status: 'ok' })
}
