import { addToLocalStorage } from "../utils/utils.js";
import { post } from "../services/apiClient.js";
import { API_URL } from "../utils/constants.js";
import { loginUser } from "../services/auth.js";

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const credentials = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };

  try {
    const profile = await loginUser(credentials);
    alert(`Welcome back, ${profile.name}!`);
    window.location.href = "./index.html";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
});

/**
 *Log in user
 * @param {object} userDetails - Details of the user logging in
 */
const ALLOWED_DOMAIN = "@stud.noroff.no";

function updateNavAuthState() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");
  // --- Check if user is logged in with a valid domain
  const isValidUser =
    isLoggedIn &&
    userEmail &&
    userEmail.toLowerCase().endsWith(ALLOWED_DOMAIN.toLowerCase());

  const loggedOutEls = document.querySelectorAll(".auth-logged-out");
  const loggedInEls = document.querySelectorAll(".auth-logged-in");

  if (isValidUser) {
    loggedOutEls.forEach((el) => (el.style.display = "none"));
    loggedInEls.forEach((el) => (el.style.display = ""));
  } else {
    loggedOutEls.forEach((el) => (el.style.display = ""));
    loggedInEls.forEach((el) => (el.style.display = "none"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavAuthState();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      updateNavAuthState();
      // Check if we're already on index.html in root, otherwise go to ../index.html
      const currentPath = window.location.pathname;
      if (currentPath.endsWith("/index.html") || currentPath.endsWith("/")) {
        window.location.reload();
      } else {
        window.location.href = "../index.html";
      }
    });
  }
});
