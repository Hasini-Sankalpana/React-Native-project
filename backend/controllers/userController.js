import User from "../models/userModel.js";

export const getUserDetails = async (req, res) => {
  const userId = req.user.id || req.user._id;

  try {
    const user = await User.findById(userId).select('-password -__v');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({
        success: true,
        message:"user details fetched successfully",
        body: {
            username: user.username,
            email: user.email,
        }
    });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error'});
    }
}
