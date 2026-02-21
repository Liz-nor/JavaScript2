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
    const data = await response.json();

    if (!response.ok) {
      const message = data?.errors?.[0]?.message || "Registration failed.";
      alert(`Error: ${message}`);
      return;
    }

    alert("Account created! You can now log in.");
    window.location.href = "./login.html";
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
}
/**
 *
 * @param {string} event - The event of registering a new profile
 */
function onRegisterFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const f = Object.fromEntries(formData);

  const userDetails = {
    name: f.name,
    email: f.email,
    password: f.password,
  };

  if (f.bio) userDetails.bio = f.bio;
  if (f["avatar-url"])
    userDetails.avatar = { url: f["avatar-url"], alt: f["avatar-alt"] || "" };
  if (f["banner-url"])
    userDetails.banner = { url: f["banner-url"], alt: f["banner-alt"] || "" };

  registerUser(userDetails);
}
registerForm.addEventListener("submit", onRegisterFormSubmit);
