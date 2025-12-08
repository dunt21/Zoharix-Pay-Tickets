"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireOwnershipOrAdmin = exports.requireOrganizer = exports.requireOrganizerOrAdmin = exports.requireAdmin = exports.requireOneOfRoles = exports.requireRole = void 0;
const ROLE_HIERARCHY = {
    user: 0,
    organizer: 1,
    admin: 2
};
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Authentication required' });
                return;
            }
            const userRole = req.user.role;
            const userLevel = ROLE_HIERARCHY[userRole];
            const requiredLevel = ROLE_HIERARCHY[requiredRole];
            if (userLevel < requiredLevel) {
                res.status(403).json({
                    message: `Access denied. Required role: ${requiredRole}, your role: ${userRole}`
                });
                return;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.requireRole = requireRole;
const requireOneOfRoles = (allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Authentication required' });
                return;
            }
            const userRole = req.user.role;
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json({
                    message: `Access denied. Allowed roles: ${allowedRoles.join(', ')}, your role: ${userRole}`
                });
                return;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.requireOneOfRoles = requireOneOfRoles;
exports.requireAdmin = (0, exports.requireRole)('admin');
exports.requireOrganizerOrAdmin = (0, exports.requireOneOfRoles)(['organizer', 'admin']);
exports.requireOrganizer = (0, exports.requireRole)('organizer');
const requireOwnershipOrAdmin = (userIdParam = 'userId') => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Authentication required' });
                return;
            }
            const userRole = req.user.role;
            const userId = req.user._id.toString();
            const resourceUserId = req.params[userIdParam];
            if (userRole === 'admin') {
                next();
                return;
            }
            if (userId !== resourceUserId) {
                res.status(403).json({ message: 'Access denied. You can only access your own resources' });
                return;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.requireOwnershipOrAdmin = requireOwnershipOrAdmin;
//# sourceMappingURL=roleMiddleware.js.map