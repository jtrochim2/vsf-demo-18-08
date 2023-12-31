import { createServer } from '@vue-storefront/middleware';
import consola from 'consola';
import cors from 'cors';
import config from '../middleware.config';

(async () => {
  const app = await createServer({ integrations: config.integrations });
  const host = process.argv[2] ?? '::';
  const port = Number(process.argv[3]) || 8181;
  const CORS_MIDDLEWARE_NAME = 'corsMiddleware';

  const corsMiddleware = app._router.stack.find(
    (middleware: { name: string }) => middleware.name === CORS_MIDDLEWARE_NAME,
  );

  corsMiddleware.handle = cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.listen(port, host, () => {
    consola.success(`API server listening on http://${host}:${port}`);
  });
})();
