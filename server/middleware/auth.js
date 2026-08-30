import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
  }
};

export default auth;
