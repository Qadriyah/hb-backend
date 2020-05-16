/**
 * Validates user input
 */
const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ error: error.details[0].message.replace(/"/g, '') });

  return next();
};

export default validationMiddleware;
