import jwt from 'jsonwebtoken';

export function signToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  });
}
