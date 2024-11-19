import jwt from "jsonwebtoken";
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Ensure token is retrieved correctly
        if (!token) {
            return res.status(401).json({ success: false, error: "Token Not Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return res.status(401).json({ success: false, error: "Token Not Valid" });
        }

        const user = await User.findById({ _id: decoded._id }).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not found" });
        }

        req.userId = user._id; // Set userId on request object
        req.user = user; // Optionally set the whole user object
        next();
    } catch (error) {
        console.error("Error in verifyUser:", error); // Log error details for debugging
        return res.status(500).json({ success: false, error: "Server Side error" });
    }
};

export default verifyUser;