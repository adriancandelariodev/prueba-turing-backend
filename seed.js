import bcrypt from "bcryptjs";
import { sequelize, models } from "./models/index.js";

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    const categories = await models.Category.bulkCreate([
      { name: "Ciencia ficcion" },
      { name: "Drama" },
      { name: "Accion" },
      { name: "Comedia" },
    ]);

    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    await models.User.bulkCreate([
      { username: "admin", password: adminPassword, role: "admin" },
      { username: "maria", password: userPassword, role: "user" },
      { username: "julian", password: userPassword, role: "user" },
    ]);

    await models.Movie.bulkCreate([
      {
        title: "Horizonte Omega",
        description: "Exploracion espacial en busca de nuevos sistemas.",
        poster_url: "https://picsum.photos/300/450?1",
        category_id: categories[0].id,
        release_year: 2024,
      },
      {
        title: "Ciudad de Luz",
        description: "Un drama urbano sobre resiliencia y ambicion.",
        poster_url: "https://picsum.photos/300/450?2",
        category_id: categories[1].id,
        release_year: 2023,
      },
      {
        title: "Pulso Final",
        description: "Operacion tactica contra una red criminal global.",
        poster_url: "https://picsum.photos/300/450?3",
        category_id: categories[2].id,
        release_year: 2025,
      },
      {
        title: "Ecos del Tiempo",
        description: "Una cientifica altera la linea temporal.",
        poster_url: "https://picsum.photos/300/450?4",
        category_id: categories[0].id,
        release_year: 2022,
      },
      {
        title: "Destino 21",
        description: "Un grupo de agentes protege un evento critico.",
        poster_url: "https://picsum.photos/300/450?5",
        category_id: categories[2].id,
        release_year: 2021,
      },
    ]);

    console.log("Seed completado.");
  } catch (error) {
    console.error("Error en el seed:", error);
  } finally {
    await sequelize.close();
  }
};

seed();

