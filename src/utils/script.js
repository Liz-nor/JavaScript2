const registerForm = document.querySelector("#register-form");

const API_URL = "https://v2.api.noroff.dev";
const AUTH_REGISTER_URL = `${API_URL}/auth/register`;
/**
 *
 * @param {string} userDetails - Details of the user registrering
 */
async function registerUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(AUTH_REGISTER_URL, fetchOptions);
  } catch (error) {
    console.log(error);
  }
}
/**
 *
 * @param {string} event - The event of registering a new profile
 */
function onRegisterFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  console.log(formFields);
  registerUser(formFields);
}
registerForm.addEventListener("submit", onRegisterFormSubmit);
