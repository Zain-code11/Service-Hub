import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  search,
  getMyServices,
} from "../controllers/serviceController.js";
import { providerOnly } from "../middlewares/roleMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/", protect, providerOnly, upload.single("image"), create);
router.get("/my", protect, providerOnly, getMyServices);
router.put("/:id", protect, providerOnly, update);
router.delete("/:id", protect, providerOnly, remove);
router.get("/", getAll);
router.get("/search", search);
router.get("/:id", getOne);
export default router;
