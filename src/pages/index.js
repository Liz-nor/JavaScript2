import {
  currentPage,
  postsPerPage,
  displayPage,
  setAllPosts,
} from "../components/pagination.js";
import { get, put } from "../services/apiClient.js";
import { logoutUser, updateAuthUI } from "../services/auth.js";

const postContainer = document.getElementById("container");

const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".profile-container");
const myUsername = JSON.parse(localStorage.getItem("profile"))?.name; // Get the current user's name from localStorage

const searchUsers = async (user) => {
  const response = await get(`/social/profiles/search?q=${user}`);
  const data = await response.data;
  return data;
};

const showSearchResults = () => {
  searchUsers(searchInput.value).then((data) => {
    if (!nameContainer) return;

    nameContainer.innerHTML = "";

    if (!data?.length) {
      nameContainer.innerHTML = "No users found.";
      return;
    }
    data.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "profile-card";
      userCard.dataset.username = user.name;
      userCard.style.cursor = "pointer";
      userCard.addEventListener("click", (e) => {
        if (e.target.matches(".follow-btn")) return;
        window.location.href = `/profilePage.html?name=${user.name}`;
      });

      const userInfo = document.createElement("div");
      userInfo.className = "profile-info";

      const userName = document.createElement("p");
      userName.className = "profile-name";
      userName.textContent = user.name;

      const userBio = document.createElement("p");
      userBio.className = "profile-bio";
      userBio.textContent = user.bio ?? ""; // Use empty string if bio is null or undefined

      userInfo.append(userName, userBio);
      userCard.appendChild(userInfo);

      if (user.name !== myUsername) {
        const followButton = document.createElement("button");
        followButton.classList.add("follow-btn", "btn", "btn-primary");
        followButton.dataset.username = user.name;
        followButton.dataset.following = "false";
        followButton.textContent = "Follow";
        userCard.appendChild(followButton);
      }
      nameContainer.appendChild(userCard);
    });
  });
};
// Events for follow/unfollow buttons
nameContainer?.addEventListener("click", async (e) => {
  if (!e.target.matches(".follow-btn")) return;
  const button = e.target;
  const username = button.dataset.username;
  const following = button.dataset.following === "true";

  if (following) {
    await put(`/social/profiles/${username}/unfollow`);
    button.textContent = "Follow";
    button.dataset.following = "false";
  } else {
    await put(`/social/profiles/${username}/follow`);
    button.textContent = "Unfollow";
    button.dataset.following = "true";
  }
});
// Searcharea
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  showSearchResults();
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    showSearchResults();
  }
});
/**
 * @param {string} fetchPosts - Fetching all the posts made in the API
 * @returns {data} Parsed Json response
 * @throws {Error} If the response does not go through
 */
export async function fetchPosts() {
  try {
    const response = await get("/social/posts");

    return response.data;
  } catch (error) {
    console.error("fetchPosts error:", error);
    return [];
  }
}

export function generatePosts(posts) {
  postContainer.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    const postElement = document.createElement("div");
    postElement.className = "post-container";

    const title = document.createElement("h2");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const anchor = document.createElement("a");
    anchor.href = `./singlePost.html?id=${post.id}`;
    anchor.textContent = "View Post";

    postElement.append(title, body, anchor);

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
  updateAuthUI();

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    logoutUser();
    updateAuthUI();
    window.location.reload();
  });

  const posts = await fetchPosts();
  setAllPosts(posts);
}

main();
