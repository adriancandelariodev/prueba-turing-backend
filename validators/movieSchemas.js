import Joi from "joi";

const movieCreateSchema = Joi.object({
  title: Joi.string().min(2).max(120).required(),
  description: Joi.string().min(10).max(1000).required(),
  poster_url: Joi.string().uri().required(),
  category_id: Joi.number().integer().positive().required(),
  release_year: Joi.number().integer().min(1900).max(2100).required(),
});

const movieUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(120),
  description: Joi.string().min(10).max(1000),
  poster_url: Joi.string().uri(),
  category_id: Joi.number().integer().positive(),
  release_year: Joi.number().integer().min(1900).max(2100),
}).min(1);

export { movieCreateSchema, movieUpdateSchema };



