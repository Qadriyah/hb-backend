import { Router } from 'express';
import asyncMiddleware from '../http/middlewares/asyncMiddleware';
import privateController from '../http/controllers/privateController';
import passport from '../config/passport';
import validationMiddleware from '../http/middlewares/validationMiddleware';
import patchSchema from '../http/validations/patchSchema';

const privateRouter = Router();

/**
 * @router  /PATCH api/patch
 * @desc    Applies a JSON patch to a JSON object
 * @access  Private
 */
privateRouter.patch(
  '/patch',
  passport.authenticate('jwt', { session: false }),
  validationMiddleware(patchSchema),
  asyncMiddleware(privateController.update),
);

/**
 * @router  /GET api/thumbnail
 * @desc    Downloads a an image from a public url
 * @access  Private
 */
privateRouter.get(
  '/thumbnail',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(privateController.getThumbnail),
);

export default privateRouter;
