import { getFromLocalStorage } from "../utils/utils.js";
import { NOROFF_API_KEY } from "../utils/constants.js";

const BASE_URL = "https://v2.api.noroff.dev";

async function apiClient(endpoint, options = {}) {
  const { body, ...customOptions } = options;

  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": NOROFF_API_KEY,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const config = {
    method: body ? "POST" : "GET", // Default to POST if body is provided, otherwise GET
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    if (body instanceof FormData) {
      // If body is FormData, let fetch set the Content-Type header with the correct boundary
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
      config.headers["Content-Type"] = "application/json";
    }
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config);
    const responseData = response.status !== 204 ? await response.json() : {};

    if (!response.ok) {
      alert(
        responseData?.errors?.[0]?.message || "An unknown API error occured.",
      );
      const errorMessage =
        responseData?.errors?.[0]?.message || "An unknown API error occured.";
      throw new Error(errorMessage);
    }
    return responseData;
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
export const get = (endpoint) => apiClient(endpoint);
export const post = (endpoint, body) => apiClient(endpoint, { body });
export const put = (endpoint, body) =>
  apiClient(endpoint, { method: "PUT", body });
export const del = (endpoint) => apiClient(endpoint, { method: "DELETE" });
