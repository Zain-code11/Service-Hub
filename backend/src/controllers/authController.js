import user from "../models/user.js";
import { registerUser, loginUser } from "../services/authService.js";
//* Register User
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
// *Login User
export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
// * User After Login
export const getMe = async (req, res) => {
  try {
    const foundUser = await user.findById(req.user.userId).select("-password");
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      success: true,
      user: foundUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
