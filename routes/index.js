import authRouter from './authRouter';
import privateRouter from './privateRouter';

const routes = {
  auth: authRouter,
  private: privateRouter,
};

export default routes;
