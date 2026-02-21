import { isLoggedIn } from "../services/auth.js";
import { get } from "../services/apiClient.js";

if (!isLoggedIn()) {
  window.location.href = "/login.html";
}

const params = new URLSearchParams(window.location.search);
const myProfile = JSON.parse(localStorage.getItem("profile"));
const username = params.get("name") || myProfile?.name;
const isOwnProfile = username === myProfile?.name;

const profileContainer = document.querySelector(".profileContainer");
const postsContainer = document.querySelector(".postsContainer");

async function loadProfile() {
  const res = await get(`/social/profiles/${username}`);
  const data = res.data;

  profileContainer.innerHTML = `
    <div class="profile-info">
      ${data.avatar?.url ? `<img class="profile-avatar" src="${data.avatar.url}" alt="${data.avatar.alt || username}" />` : ""}
      <h2>${data.name}</h2>
      ${data.bio ? `<p class="profile-bio">${data.bio}</p>` : ""}
      <p class="profile-stats">${data._count?.posts ?? 0} posts  ${data._count?.followers ?? 0} followers  ${data._count?.following ?? 0} following</p>
    </div>
  `;
}

async function loadPosts() {
  const res = await get(`/social/profiles/${username}/posts`);
  const posts = res.data;

  if (!posts?.length) {
    postsContainer.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  postsContainer.innerHTML = posts
    .map(
      (post) => `
    <div class="post-container">
      <h3>${post.title}</h3>
      ${post.body ? `<p>${post.body}</p>` : ""}
      ${post.media?.url ? `<img class="post-image" src="${post.media.url}" alt="${post.media.alt || post.title}" onerror="this.remove()" />` : ""}
      <div class="post-actions">
        <a href="/singlePost.html?id=${post.id}" class="card-link">View</a>
        ${isOwnProfile ? `<a href="/editPost.html?id=${post.id}" class="card-link">Edit</a>` : ""}
      </div>
    </div>
  `,
    )
    .join("");
}

loadProfile();
loadPosts();
