import { put } from "../services/apiClient.js";

const avatarForm = document.getElementById("avatar-update-form");
const username = "some-test-user";
const profileForm = document.getElementById("profile-form");

/** Handles the profile form submission
 * @param {Event} event - The form submission event
 * @param {HTMLFormElement} profileForm - The profile form element
 * @returns {void}
 */
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(profileForm);

  for (const [key, value] of formData.entries()) {
  }
});

avatarForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(avatarForm);

  try {
    const response = await put(`/social/profiles/${username}/media`, formData);
    alert("Avatar updated successfully!");
    document.getElementById("profile-pic").src = response.data.avatar.url;
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
