import User from "../models/User.js";
import bcrypt from 'bcrypt';

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Find user by ID
        const user = await User.findById(userId); // Corrected here

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Compare old password with stored password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Wrong old password" }); // Changed status code
        }

        // Hash new password
        const hashPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await User.findByIdAndUpdate(userId, { password: hashPassword }); // Corrected here

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("Error changing password:", error); // Log the actual error for debugging
        return res.status(500).json({ success: false, error: "Internal server error" }); // More generic error message
    }
};

export { changePassword };