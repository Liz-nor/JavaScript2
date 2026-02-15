import { post } from "./apiClient.js";

const LOGIN_ENDPOINT = "/auth/login";

/**
 * Logs in a user.
 * @param {object} credentials The users email and password.
 * @returns {Promise<object>} The user profile data.
 */
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
