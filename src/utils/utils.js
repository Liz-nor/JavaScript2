export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromLocateStorage(key) {
  return localStorage.getItem(key);
}
