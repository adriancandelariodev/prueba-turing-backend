import { DataTypes } from "sequelize";

const Movie = (sequelize) =>
  sequelize.define(
    "Movie",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      poster_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
      release_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "movies",
      timestamps: false,
    }
  );

export default Movie;



