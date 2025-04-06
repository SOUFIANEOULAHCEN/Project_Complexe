// middleware/roles.js

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      const { typeUser } = req.user;
  
      if (!allowedRoles.includes(typeUser)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }
  
      next();
    };
  };
  






//   router.get('/admin-only', authenticateToken, authorizeRoles('admin', 'superadmin'), (req, res) => {
//     res.json({ message: 'Welcome admin!' });
//   });
  