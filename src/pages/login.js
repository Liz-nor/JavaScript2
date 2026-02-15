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
// export async function loginUser(userDetails) {
//   try {
//     const response = await post("/auth/login", userDetails);
//     const { accessToken, ...profile } = response.data;

//     if (accessToken) {
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("profile", JSON.stringify(profile));
//       return profile;
//     } else {
//       throw new Error("Login successful, but no access token recieved");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
// /**
//  *
//  * @param {string} event - The event of logging in to a profile
//  */
// function onLoginFormSubmit(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const formFields = Object.fromEntries(formData);
//   console.log(formFields);
//   loginUser(formFields);
//   console.log("loginForm", loginForm);
// }
// loginForm.addEventListener("submit", onLoginFormSubmit);
