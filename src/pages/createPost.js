// import { API_URL, NOROFF_API_KEY } from "../utils/constants.js";
// import { getFromLocalStorage } from "../utils/utils.js";

// const POSTS_URL = `${API_URL}/social/posts`;

// const addPostForm = document.querySelector("#add-post-form");
// const titleValue = document.getElementById("form-title");
// const bodyValue = document.getElementById("form-body");

// export async function createPost(title, body, tags = [], media = null) {
//   const accessToken = getFromLocalStorage("accessToken");

//   const response = await fetch(POSTS_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       "X-Noroff-API-Key": NOROFF_API_KEY,
//     },
//     body: JSON.stringify({
//       title: titleValue.value,
//       body: bodyValue.value,
//       tags,
//       media,
//     }),
//   });
//   if (!response.ok) {
//     let errorMessage = "Failed to create post";
//     try {
//       const error = await response.json();
//       errorMessage =
//         error?.errors?.[0]?.message || error?.message || errorMessage;
//     } catch (_) {}
//     throw new Error(errorMessage);
//   }

//   const data = await response.json();
//   console.log("Created post:", data.data);
//   return data.data;
// }
// import { post } from "../../api/apiClient.js";
// async function createPost(postData) {
//   try {
//     const newPost = await post('/social/posts', postData);
// }
// if (addPostForm) {
//   addPostForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     try {
//       const newPost = await createPost(
//         titleValue.value.trim(),
//         bodyValue.value.trim(),
//         [],
//         null,
//       );
//       addPostForm.reset();
//       console.log("Post created", newPost);
//       if (addPostForm) {
//   addPostForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     } catch (error) {
//       console.error("Create post error:", error.message);
//     }
//   });
// }
// }
import { post } from "../services/apiClient.js";

const addPostForm = document.querySelector("#add-post-form");
const titleValue = document.getElementById("form-title");
const bodyValue = document.getElementById("form-body");

const submitBtn = document.getElementById("postSubmit");
const modal = document.getElementById("postModal");
const closeModalBtn = document.getElementById("closeModal");

async function createPost(postData) {
  try {
    const newPost = await post("/social/posts", postData);
    console.log("Created post:", newPost);
    return newPost;
  } catch (error) {
    console.error("Create post error:", error.message);
    throw error;
  }
}

if (addPostForm) {
  addPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = `<span class="button-spinner"></span> Processing...`;

    try {
      const newPost = await createPost({
        title: titleValue.value.trim(),
        body: bodyValue.value.trim(),
      });
      addPostForm.reset();
      console.log("Post created", newPost);
      moodal.classList.remove("hidden");
    } catch (error) {
      console.error("Create post error:", error.message);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}
