import express from "express";

import {
  profile,
  update,
  changeUserPassword,
  getUsers,
  updateRole,
  removeUser,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();


// ===============================
// User Profile Routes (Static routes first)
// ===============================

// Get own profile
router.get(
  "/profile",
  protect,
  profile
);

// Update own profile
router.patch(
  "/profile",
  protect,
  update
);

// Change own password
router.patch(
  "/change-password",
  protect,
  changeUserPassword
);


// ===============================
// Admin Routes (Dynamic/general routes after)
// ===============================

// Get all users
router.get(
  "/",
  protect,
  adminOnly,
  getUsers
);

// Update user role
router.patch(
  "/:id/role",
  protect,
  adminOnly,
  updateRole
);

// Delete user
router.delete(
  "/:id",
  protect,
  adminOnly,
  removeUser
);


export default router;
