import Joi from '@hapi/joi';

const patchSchema = Joi.object({
  document: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  patch: Joi.array().items(
    Joi.object({
      op: Joi.string().required(),
      path: Joi.string().required(),
      value: Joi.string().required(),
    }),
  ),
});

export default patchSchema;
