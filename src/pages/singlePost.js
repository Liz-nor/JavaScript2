import { get, del, put } from "../services/apiClient.js";
import { isLoggedIn } from "../services/auth.js";

const singlePostContainer = document.getElementById("container");
const myUsername = JSON.parse(localStorage.getItem("profile"))?.name;

async function fetchSinglePosts() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    singlePostContainer.textContent = "No post ID provided in the URL";
    return;
  }

  try {
    const response = await get(`/social/posts/${postId}?_author=true`);
    const post = response.data;
    const imgAlt = post.media?.alt || "Post image";
    const authorName = post.author?.name;

    singlePostContainer.innerHTML = `
    <article class="post" data-id="${post.id}">
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      ${post.media?.url ? `<img class="post-single-image" src="${post.media.url}" alt="${imgAlt}" />` : ""}
      ${post.tags?.length ? `<div class="tags">${post.tags.map((tag) => `<span>*${tag} </span>`).join("")}</div>` : ""}
      ${authorName && authorName !== myUsername ? `<p>By: ${authorName} <button class="follow-btn" data-username="${authorName}" data-following="false">Follow</button></p>` : ""}
      ${authorName === myUsername
          ? `<a href="#" id="edit-post" class="card-link">Edit</a>
             <a href="#" id="delete-post" class="card-link">Remove</a>`
          : ""
      }
      <a href="/index.html" class="card-link">Back</a>
    </article>`;
  } catch (error) {
    singlePostContainer.innerHTML = `<p>Error loading post.</p>`;
    console.error(error.message);
  }
}

singlePostContainer.addEventListener("click", async (e) => {
  const article = singlePostContainer.querySelector("article");
  const postId = article?.dataset.id;

  if (e.target.id === "delete-post") {
    e.preventDefault();
    del(`/social/posts/${postId}`);
    console.log("Post removed!");
  }
  if (e.target.id === "edit-post") {
    e.preventDefault();
    window.location.href = `/editPost.html?id=${postId}`;
  }
  if (e.target.matches(".follow-btn")) {
    e.preventDefault();
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
  }
});

fetchSinglePosts();
