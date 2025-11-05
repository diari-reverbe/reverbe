const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function apiFetch(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
  };

  if (API_KEY) {
    headers["x-api-key"] = API_KEY;
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);

    return await res.json();
  } catch (err) {
    console.warn("API cannot be reached — falling back to mock data", err);
    throw err;
  }
}
