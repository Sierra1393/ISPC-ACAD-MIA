Exit code: 0
Wall time: 1.1 seconds
Output:
// Punt d'entrada serverless per a Vercel.
// Les rutes /api/* continuen definides a server.ts per poder usar el mateix
// codi tant localment com en producció.
import app from '../server';

export default app;

