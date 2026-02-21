import { addToLocalStorage } from "../utils/utils.js";
import { post } from "../services/apiClient.js";
import { API_URL } from "../utils/constants.js";
import { loginUser } from "../services/auth.js";
/**
 * Handles the login form submission, sends the credentials to the API, and stores the user profile in localStorage.
 * @param {Event} event - The form submission event
 */
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
