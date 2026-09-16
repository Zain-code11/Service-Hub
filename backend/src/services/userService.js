import User from "../models/user.js";
import bcrypt from 'bcryptjs'

// Get current user's profile
export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


// Update current user's profile
export const updateProfile = async (userId, updateData) => {
  const allowedFields = [
    "name",
    "phone",
    "bio",
    "profileImage",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


// Change password
export const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await user.save();

  return true;
};


// Get all users - Admin
export const getAllUsers = async () => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  return users;
};


// Update user role - Admin
export const updateUserRole = async (userId, role) => {
  const allowedRoles = [
    "customer",
    "provider",
    "admin",
  ];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.role = role;

  await user.save();

  return await User.findById(userId).select("-password");
};


// Delete user - Admin
export const deleteUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(userId);

  return user;
};
