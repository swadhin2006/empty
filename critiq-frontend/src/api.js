// Central API base URL — uses env var in production, relative path in dev (proxied by Vite)
const API_BASE = import.meta.env.VITE_API_URL
  ? `https://${import.meta.env.VITE_API_URL}`
  : '';

export default API_BASE;
