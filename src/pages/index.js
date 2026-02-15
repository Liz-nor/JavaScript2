import { getFromLocalStorage } from "../utils/utils.js";
import {
  currentPage,
  postsPerPage,
  displayPage,
  setAllPosts,
} from "../components/pagination.js";
import { getNavbarHTML } from "../components/navbar.js";
import { API_URL, NOROFF_API_KEY } from "../utils/constants.js";
const postContainer = document.getElementById("container");

const POSTS_URL = `${API_URL}/social/posts`;

/**
 * @param {string} fetchPosts - Fetching all the posts made in the API
 * @returns {data} Parsed Json response
 * @throws {Error} If the response does not go through
 */
export async function fetchPosts() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    console.log("accessToken", accessToken);

    const response = await fetch(POSTS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    return json.data;
  } catch (error) {
    console.error("fetchPosts error:", error);
    return [];
  }
}

export function generatePosts(posts) {
  postContainer.innerHTML = "";
  console.log(posts);
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    const postElement = document.createElement("div");
    postElement.className = "post-container";

    const title = document.createElement("h2");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    postElement.append(title, body);

    const mediaUrl = post.media?.url;

    if (mediaUrl) {
      const image = document.createElement("img");
      image.className = "post-image";
      image.src = mediaUrl;
      image.alt = post.media?.alt || post.title || "Post-image";
      image.onerror = () => image.remove();

      postElement.append(image);
    }
    postContainer.appendChild(postElement);
  }
}

async function main() {
  const posts = await fetchPosts();
  setAllPosts(posts);
}

main();
