import { models } from "../models/index.js";

const listCategories = async (_req, res) => {
  const categories = await models.Category.findAll({
    order: [["name", "ASC"]],
  });
  res.json(categories);
};

export { listCategories };


