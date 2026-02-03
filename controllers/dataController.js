import { models } from "../models/index.js";

const getData = async (_req, res) => {
  const [usersCount, categoriesCount, moviesCount] = await Promise.all([
    models.User.count(),
    models.Category.count(),
    models.Movie.count(),
  ]);

  const movies = await models.Movie.findAll({
    limit: 5,
    order: [["release_year", "DESC"]],
    include: [
      {
        model: models.Category,
        attributes: ["id", "name"],
      },
    ],
  });

  const kpiValue = `${(Math.random() * 20 + 80).toFixed(1)}%`;
  const trend = Math.random() > 0.5 ? "Subiendo" : "Estable";

  res.json({
    message: "Datos simulados para el dashboard.",
    generatedAt: new Date().toISOString(),
    metrics: {
      kpiValue,
      trend,
    },
    summary: {
      usersCount,
      categoriesCount,
      moviesCount,
    },
    activities: [
      "Seed aplicado con peliculas y categorias.",
      "Modelo relacional validado en SQLite.",
      "API lista para escalabilidad por controladores.",
    ],
    modelHint:
      "Sugerencia: agregar paginacion y filtros en /api/movies.",
    movies,
  });
};

export { getData };

