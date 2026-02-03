import { Router } from "express";
import {
  listMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/moviesController.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  movieCreateSchema,
  movieUpdateSchema,
} from "../validators/movieSchemas.js";

const router = Router();

router.use(authenticate);

router.get("/", listMovies);
router.get("/:id", getMovie);
router.post("/", authorizeRoles("admin"), validate(movieCreateSchema), createMovie);
router.put("/:id", authorizeRoles("admin"), validate(movieUpdateSchema), updateMovie);
router.delete("/:id", authorizeRoles("admin"), deleteMovie);

export default router;



