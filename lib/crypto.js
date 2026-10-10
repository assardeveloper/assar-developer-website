// Locks the GitHub key with the admin password (PBKDF2 + AES-GCM, in the browser).
// The locked key is kept only in this device's browser storage, never uploaded anywhere.
const ITERATIONS = 600000;

const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function deriveKey(password, salt, iterations) {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function lockSecret(secret, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, ITERATIONS);
  const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(secret));
  return { v: 1, iterations: ITERATIONS, salt: b64(salt), iv: b64(iv), data: b64(data) };
}

// Returns the secret, or null if the password is wrong.
export async function unlockSecret(lock, password) {
  try {
    const key = await deriveKey(password, unb64(lock.salt), lock.iterations ?? ITERATIONS);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(lock.iv) }, key, unb64(lock.data));
    return new TextDecoder().decode(plain);
  } catch {
    return null;
  }
}
