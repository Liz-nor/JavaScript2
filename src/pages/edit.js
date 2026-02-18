import { get, put } from "../services/apiClient.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const postTags = params.get("tags");

const form = document.getElementById("edit-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");

const res = await get(`/social/posts/${postId}`);
const post = res.data;
// const post = await get(`/social/posts/${postId}`);
titleInput.value = post.title ?? "";
bodyInput.value = post.body ?? "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await put(`/social/posts/${postId}`, {
    title: titleInput.value,
    body: bodyInput.value,
  });

  window.location.href = `/post.html=id=${postId}`;
});
