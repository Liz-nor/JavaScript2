import { post } from "./apiClient.js";

const LOGIN_ENDPOINT = "/auth/login";
/**
 * Function that logs in a user.
 * @param {object} credentials The users email and password.
 * @returns {object} The users profile information.
 * @throws {Error} If the login request fails or if no access token is received.
 */

export function isLoggedIn() {
  return Boolean(localStorage.getItem("accessToken"));
}
/**
 * Checks if the user is logged in by verifying the presence of an access token in localStorage.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export function updateAuthUI() {
  const loggedIn = isLoggedIn();
  document.querySelectorAll(".isLoggedIn").forEach((el) => {
    el.style.display = loggedIn ? "" : "none";
  });
  document.querySelectorAll(".isLoggedOut").forEach((el) => {
    el.style.display = loggedIn ? "none" : "";
  });
}
/**
 * Opens the authentication modal.
 * @param {string} mode - The mode of the modal, either "login" or "signup".
 *
 */
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
    window.dispatchEvent(new Event("auth:changed")); // Trigger a custom event to update the UI after logout
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
  alert("User has been logged out.");
}
