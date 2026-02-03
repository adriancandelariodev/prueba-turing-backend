import { Op } from "sequelize";
import { models } from "../models/index.js";

const listMovies = async (req, res) => {
  const { category, category_id: categoryId } = req.query;
  const limit = Math.min(Number(req.query.limit) || 8, 50);
  const offset = Number(req.query.offset) || 0;
  const search = req.query.q?.trim();

  const categoryFilter = category
    ? { name: category }
    : categoryId
      ? { id: Number(categoryId) }
      : undefined;

  const movieWhere = search
    ? {
        title: {
          [Op.like]: `%${search}%`,
        },
      }
    : undefined;

  const { rows, count } = await models.Movie.findAndCountAll({
    include: [
      {
        model: models.Category,
        attributes: ["id", "name"],
        ...(categoryFilter ? { where: categoryFilter } : {}),
      },
    ],
    ...(movieWhere ? { where: movieWhere } : {}),
    order: [["release_year", "DESC"]],
    limit,
    offset,
    distinct: true,
  });

  res.json({
    items: rows,
    total: count,
    limit,
    offset,
  });
};

const getMovie = async (req, res) => {
  const movie = await models.Movie.findByPk(req.params.id, {
    include: [{ model: models.Category, attributes: ["id", "name"] }],
  });

  if (!movie) {
    return res.status(404).json({ message: "Pelicula no encontrada." });
  }

  return res.json(movie);
};

const createMovie = async (req, res) => {
  const { category_id } = req.body;
  const category = await models.Category.findByPk(category_id);
  if (!category) {
    return res.status(400).json({ message: "Categoria invalida." });
  }

  const movie = await models.Movie.create(req.body);
  return res.status(201).json(movie);
};

const updateMovie = async (req, res) => {
  const movie = await models.Movie.findByPk(req.params.id);
  if (!movie) {
    return res.status(404).json({ message: "Pelicula no encontrada." });
  }

  if (req.body.category_id) {
    const category = await models.Category.findByPk(req.body.category_id);
    if (!category) {
      return res.status(400).json({ message: "Categoria invalida." });
    }
  }

  await movie.update(req.body);
  return res.json(movie);
};

const deleteMovie = async (req, res) => {
  const movie = await models.Movie.findByPk(req.params.id);
  if (!movie) {
    return res.status(404).json({ message: "Pelicula no encontrada." });
  }

  await movie.destroy();
  return res.status(204).send();
};

export { listMovies, getMovie, createMovie, updateMovie, deleteMovie };

