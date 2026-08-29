/**
 * TEMPORARY AUTHENTICATION STUB MIDDLEWARE
 * 
 * This middleware is a stub designed to simulate user authentication and authorization
 * while the main authentication system (Backend A) is being developed.
 * 
 * You can control the mock user's role and ID by passing the following headers in your requests:
 * - `x-mock-role`: 'citizen', 'admin', or 'university' (default: 'citizen')
 * - `x-mock-user-id`: Any Mongoose ObjectId string (default: '60d5ecb8b392d7001f8e8e3a')
 * 
 * Alternatively, you can pass them as query parameters (e.g., `?mockRole=admin&mockUserId=...`).
 */

export const authenticate = (req, res, next) => {
  // Extract mock values from headers or query parameters, fallback to defaults
  const mockRole = req.headers['x-mock-role'] || req.query.mockRole || 'citizen';
  const mockUserId = req.headers['x-mock-user-id'] || req.query.mockUserId || '60d5ecb8b392d7001f8e8e3a';

  // Attach mock user to the request object
  req.user = {
    id: mockUserId,
    role: mockRole.toLowerCase(),
  };

  console.log(`[AUTH STUB] Authenticated request as User ID: ${req.user.id}, Role: ${req.user.role}`);
  next();
};

export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user credentials provided',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to roles [${allowedRoles.join(', ')}]. Current role: ${req.user.role}`,
      });
    }

    next();
  };
};
