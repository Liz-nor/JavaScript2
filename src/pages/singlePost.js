import { get, del, put } from "../services/apiClient.js";

const singlePostContainer = document.getElementById("container");

async function fetchSinglePosts() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    singlePostContainer.textContent = "No post ID provided in the URL";
    return;
  }

  try {
    const response = await get(`/social/posts/${postId}`);
    const post = response.data;
    const imgAlt = post.media?.alt || "Post image";

    singlePostContainer.innerHTML = `
    <article class="post" data-id="${post.id}">
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      ${post.media?.url ? `<img class="post-single-image" src="${post.media.url}" alt="${imgAlt}" />` : ""}
      ${post.tags?.length ? `<div class="tags">${post.tags.map((tag) => `<span>*${tag} </span>`).join("")}</div>` : ""}
      <a href="#" id="edit-post" class="card-link">Edit</a>
      <a href="#" id="delete-post" class="card-link">Remove</a>
    </article>
    `;
  } catch (error) {
    singlePostContainer.innerHTML = `<p>Error loading post.</p>`;
    console.error(error.message);
  }
}

singlePostContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const article = singlePostContainer.querySelector("article");
  const postId = article?.dataset.id;

  if (e.target.id === "delete-post") {
    del(`/social/posts/${postId}`);
    console.log("Post removed!");
  }
  if (e.target.id === "edit-post") {
    put(`/social/posts/${postId}`);
    window.location.href = `/editPost.html?id=${postId}`;
  }
});

fetchSinglePosts();
