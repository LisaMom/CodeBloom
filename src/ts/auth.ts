export interface User {
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const AUTH_KEY = 'CodeBloom_auth';

export function getAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { isAuthenticated: false, user: null };
    const parsed = JSON.parse(raw);
    return {
      isAuthenticated: Boolean(parsed.isAuthenticated),
      user: parsed.user || null,
    };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

/**
 * Authentication Service
 * Currently runs in Demo mode using localStorage (storing only email/name, NEVER passwords).
 * Easily swapped with a backend REST/GraphQL API by changing this implementation.
 */
export async function login(email: string, _password?: string): Promise<User> {
  // Simulate network latency like a real API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In demo mode: derive friendly name from email username
  const username = email.split('@')[0] || 'Learner';
  const formattedName = username
    .split(/[._-]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const user: User = {
    email,
    name: formattedName,
  };

  const authState: AuthState = {
    isAuthenticated: true,
    user,
  };

  // Only store safe non-sensitive user metadata
  localStorage.setItem(AUTH_KEY, JSON.stringify(authState));

  window.dispatchEvent(new CustomEvent('codebloom:auth-change', { detail: authState }));
  return user;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  const emptyState: AuthState = { isAuthenticated: false, user: null };
  window.dispatchEvent(new CustomEvent('codebloom:auth-change', { detail: emptyState }));
}

export function onAuthChange(callback: (auth: AuthState) => void): () => void {
  const handler = (e: Event) => {
    const custom = e as CustomEvent<AuthState>;
    callback(custom.detail || getAuth());
  };
  window.addEventListener('codebloom:auth-change', handler);
  return () => window.removeEventListener('codebloom:auth-change', handler);
}
