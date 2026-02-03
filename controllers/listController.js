import { models } from "../models/index.js";

const listMyList = async (req, res) => {
  const user = await models.User.findByPk(req.user.id, {
    include: [
      {
        model: models.Movie,
        as: "list",
        include: [{ model: models.Category, attributes: ["id", "name"] }],
        through: { attributes: [] },
      },
    ],
    order: [[{ model: models.Movie, as: "list" }, "release_year", "DESC"]],
  });

  return res.json({ items: user?.list || [] });
};

const addToList = async (req, res) => {
  const movieId = Number(req.params.movieId);
  if (!Number.isInteger(movieId)) {
    return res.status(400).json({ message: "Pelicula invalida." });
  }

  const movie = await models.Movie.findByPk(movieId, {
    include: [{ model: models.Category, attributes: ["id", "name"] }],
  });
  if (!movie) {
    return res.status(404).json({ message: "Pelicula no encontrada." });
  }

  await models.MyList.findOrCreate({
    where: { user_id: req.user.id, movie_id: movieId },
  });

  return res.status(201).json(movie);
};

const removeFromList = async (req, res) => {
  const movieId = Number(req.params.movieId);
  if (!Number.isInteger(movieId)) {
    return res.status(400).json({ message: "Pelicula invalida." });
  }

  await models.MyList.destroy({
    where: { user_id: req.user.id, movie_id: movieId },
  });

  return res.status(204).send();
};

export { listMyList, addToList, removeFromList };
