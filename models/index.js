import { Sequelize } from "sequelize";
import User from "./User.js";
import Category from "./Category.js";
import Movie from "./Movie.js";
import MyList from "./MyList.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const models = {
  User: User(sequelize),
  Category: Category(sequelize),
  Movie: Movie(sequelize),
  MyList: MyList(sequelize),
};

models.Category.hasMany(models.Movie, {
  foreignKey: "category_id",
});
models.Movie.belongsTo(models.Category, {
  foreignKey: "category_id",
});

models.User.belongsToMany(models.Movie, {
  through: models.MyList,
  foreignKey: "user_id",
  otherKey: "movie_id",
  as: "list",
});
models.Movie.belongsToMany(models.User, {
  through: models.MyList,
  foreignKey: "movie_id",
  otherKey: "user_id",
  as: "savedBy",
});

export { sequelize, models };



