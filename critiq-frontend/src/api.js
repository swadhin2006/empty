// In production on Vercel, API is on the same domain at /api
// In local dev, proxy via vite to localhost:5000
const API_BASE = import.meta.env.DEV ? 'http://localhost:5000' : '';

export default API_BASE;
