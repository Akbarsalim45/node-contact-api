import express from "express";
import {
  addContact,
  deleteContact,
  getAllContact,
  getSingleContact,
  updateContact,
} from "../controller/contactController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", getAllContact);
router.post("/", addContact);
router.get("/:id", getSingleContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
