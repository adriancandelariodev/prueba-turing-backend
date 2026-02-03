import { Router } from "express";
import { listCategories } from "../controllers/categoriesController.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.use(authenticate);
router.get("/", listCategories);

export default router;


