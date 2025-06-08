import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function verifySupabaseToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });

  const token = authHeader.split(' ')[1];

  try {
    const secret = Buffer.from(process.env.SUPABASE_JWT_KEY, 'base64'); // decode Base64 secret
    const decoded = jwt.verify(token, secret);

    req.user = decoded; // Contains fields like sub, role, email, etc.
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
