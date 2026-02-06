import { getFromLocateStorage } from "../utils/utils.js";

const postContainer = document.getElementById("container");

const API_URL = "https://v2.api.noroff.dev";
const POSTS_URL = `${API_URL}/social/posts`;

const NOROFF_API_KEY = `d9384ada-1b61-4c9a-9eea-d4410a3e835f`;
/**
 * @param {string} fetchPosts - Fetching all the posts made in the API
 * @returns {data} Parsed Json response
 * @throws {Error} If the response does not go through
 */
async function fetchPosts() {
  try {
    const accessToken = getFromLocateStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };

    const response = await fetch(POSTS_URL, fetchOptions);
    const json = await response.json();
    return json.data;
  } catch (error) {}
}
/**
 *
 * @param {*} posts
 */
function generatePosts(posts) {
  console.log(posts);
  for (let i = 0; i < posts.length; i++) {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";

    const title = document.createElement("h2");
    title.textContent = posts[i].title;

    const body = document.createElement("p");
    body.textContent = posts[i].body;

    const image = document.createElement("img");
    image.className = "post-image";
    const mediaUrl = posts[i].media?.url || posts[i].image?.url;
    if (mediaUrl) {
      image.src = mediaUrl;
    } else {
      image.style.display = "none";
    }
    image.onerror = () => {
      //If no image, dont show broken image icon
      image.style.display = "none";
    };
    console.log(posts[i]);
    postContainer.append(title, body, image);

    container.append(postContainer);
  }
}

async function main() {
  const posts = await fetchPosts();
  generatePosts(posts);
}

main();
