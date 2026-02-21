import { get, put } from "../services/apiClient.js";

/**
 * Fetches the post data and populates the edit form with the existing title and body.
 * Listens for the form submission, sends the updated data to the API, and redirects to the single post view.
 */
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const postTags = params.get("tags");

const form = document.getElementById("edit-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const tagsInput = document.getElementById("form-tags");
const imageUrlInput = document.getElementById("form-image-url");
const imageAltInput = document.getElementById("form-image-alt");
const modal = document.getElementById("editModal");
const closeModalBtn = document.getElementById("closeModal");

closeModalBtn.addEventListener("click", () => {
  window.location.href = `/index.html`;
});

const res = await get(`/social/posts/${postId}`);
const post = res.data;

titleInput.value = post.title ?? "";
bodyInput.value = post.body ?? "";
tagsInput.value = post.tags?.join(", ") ?? "";
imageUrlInput.value = post.media?.url ?? "";
imageAltInput.value = post.media?.alt ?? "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    title: titleInput.value,
    body: bodyInput.value,
    tags: tagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };

  if (imageUrlInput.value) {
    payload.media = { url: imageUrlInput.value, alt: imageAltInput.value };
  }

  await put(`/social/posts/${postId}`, payload); // Send the updated post data to the API

  modal.classList.remove("hidden");
});
