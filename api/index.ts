// Punt d'entrada serverless per a Vercel.
// Les rutes /api/* continuen definides a server.ts per poder usar el mateix
// codi tant localment com en producció.
import app from '../server';

export default app;

