import { addToLocalStorage } from "../utils/utils.js";

console.log("login.js is loaded");
const loginForm = document.querySelector("#login-form");

const API_URL = "https://v2.api.noroff.dev";
const AUTH_REGISTER_URL = `${API_URL}/auth/login`;
/**
 *
 * @param {string} userDetails - Details of the user logging in
 */
async function loginUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(AUTH_REGISTER_URL, fetchOptions);
    const json = await response.json();
    console.log(json.accessToken);
    const accessToken = json.data.accessToken;
    addToLocalStorage("accessToken", accessToken);
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
/**
 *
 * @param {string} event - The event of logging in to a profile
 */
function onLoginFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  console.log(formFields);
  loginUser(formFields);
  console.log("loginForm", loginForm);
}
loginForm.addEventListener("submit", onLoginFormSubmit);
