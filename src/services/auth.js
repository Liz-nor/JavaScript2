import { post } from "./apiClient.js";

const LOGIN_ENDPOINT = "/auth/login";
/**
 * Logs in a user.
 * @param {object} credentials The users email and password.
 * @returns {Promise<object>} The user profile data.
 */

export function isLoggedIn() {
  return Boolean(localStorage.getItem("accessToken"));
}

export function openAuthModal(mode = "login") {
  const modal = document.getElementById("loginModal");
  modal.dataset.mode = mode;
  modal.style.display = "block";
}

export function closeAuthModal() {
  document.getElementById("loginModal").style.display = "none";
}

export function initAuth() {
  document
    .getElementById("closeModal")
    .addEventListener("click", closeAuthModal);

  document.getElementById("loginModal").addEventListener("click", (e) => {
    if (e.target.id === "loginModal") closeAuthModal();
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    localStorage.setItem(LOGIN_ENDPOINT, "true");

    closeAuthModal();
    window.dispatchEvent(new Event("auth:changed"));
  });
}

export function logout() {
  localStorage.removeItem(LOGIN_ENDPOINT);
  window.dispatchEvent(new Event("auth:changed"));
}

export async function loginUser(credentials) {
  try {
    const response = await post(LOGIN_ENDPOINT, credentials);

    const { accessToken, ...profile } = response.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("profile", JSON.stringify(profile));
      return profile;
    } else {
      throw new Error("Login successful, but no access token received.");
    }
  } catch (error) {
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("profile");
  console.log("User has been logged out.");
}
