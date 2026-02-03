import { Router } from "express";
import {
  listMyList,
  addToList,
  removeFromList,
} from "../controllers/listController.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.use(authenticate);

router.get("/", listMyList);
router.post("/:movieId", addToList);
router.delete("/:movieId", removeFromList);

export default router;
