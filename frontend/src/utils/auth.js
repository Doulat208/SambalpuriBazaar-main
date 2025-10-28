export const API_BASE = 'http://localhost:9090';

export function makeBasicToken(email, password) {
  return btoa(`${email}:${password}`);
}

export function authHeaderFromStorage() {
  const token = localStorage.getItem('sb_basic');
  if (!token) return {};
  return { Authorization: `Basic ${token}` };
}

export async function authCheck(token) {
  // hit a protected endpoint: /user (requires auth by default)
  const res = await fetch(`${API_BASE}/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });
  if (res.status === 401 || res.status === 403) return false;
  return res.ok;
}

export function isLoggedIn() {
  return !!localStorage.getItem('sb_basic');
}

export function logout() {
  localStorage.removeItem('sb_basic');
}
