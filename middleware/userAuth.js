import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized..!, Login again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded?.id) {
            req.user = { id: decoded.id }; // Better than modifying req.body
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message || 'Authorization failed' });
    }
};

export default userAuth;
