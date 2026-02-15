import { getFromLocalStorage } from "../utils/utils.js";
import { NOROFF_API_KEY } from "../utils/constants.js";

const BASE_URL = "https://v2.api.noroff.dev";

async function apiClient(endpoint, options = {}) {
  const { body, ...customOptions } = options;

  const apiKey = localStorage.getItem("apiKey");
  console.log(typeof NOROFF_API_KEY);
  console.log(NOROFF_API_KEY);
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["X-Noroff-API-Key"] = apiKey;
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
      config.headers["Content-Type"] = "application/json";
    }
  }

  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");
  if (apiKey) config.headers["X-Noroff-API-Key"] = apiKey;
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(BASE_URL + endpoint, config);
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseData.errors?.[0]?.message || "An unknown API error occured.";
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
