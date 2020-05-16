import debug from 'debug';
import app from '../server';

debug('backend');

const { PORT } = process.env;
app.set('port', PORT);

const server = app.listen(app.get('port'), () => {
  debug(`Server listening on port ${server.address().port}`);
});
