import { put } from "../services/apiClient.js";

const avatarForm = document.getElementById("avatar-update-form");
const username = "some-test-user";
const profileForm = document.getElementById("profile-form");

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(profileForm);

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
});

avatarForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(avatarForm);

  try {
    const response = await put(`/social/profiles/${username}/media`, formData);
    console.log("Avatar updated successfully!", response.data);
    document.getElementById("profile-pic").src = response.data.avatar.url;
  } catch (error) {
    console.error("Failed to update avatar:", error);
    alert(`Error: ${error.message}`);
  }
});
