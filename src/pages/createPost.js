import { post, del } from "../services/apiClient.js";
import { isLoggedIn } from "../services/auth.js";

if (!isLoggedIn()) {
  window.location.href = "./login.html";
}

const addPostForm = document.querySelector("#add-post-form");
const titleValue = document.getElementById("form-title");
const bodyValue = document.getElementById("form-body");

const tagsValue = document.getElementById("form-tags");
const imageUrlValue = document.getElementById("form-image-url");
const imageAltUrlValue = document.getElementById("form-image-alt");

const submitBtn = document.getElementById("postSubmit");
const modal = document.getElementById("postModal");
const closeModalBtn = document.getElementById("closeModal");

async function createPost(postData) {
  try {
    const newPost = await post("/social/posts", postData);
    return newPost;
  } catch (error) {
    throw error;
  }
}
if (!createPost) {
  alert("something went wrong");
}
async function isImageUrl(url) {
  // This function checks if the URL points to an image by making a HEAD request and checking the Content-Type header
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.startsWith("image/");
  } catch (error) {
    return false;
  }
}
function looksLikeImageUrl(url) {
  return /\.(png|jpeg|jpg|webp|gif|svg)$/i.test(url); // Check if URL ends with common image extensions, if not, it probably isn't a direct image link
}

if (addPostForm) {
  addPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = `<span class="button-spinner"></span> Processing...`;

    const tags = (tagsValue?.value || "")
      .split(",") // split into an array using commas
      .map((t) => t.trim()) //removes whitespace at beginning og end of strings
      .filter(Boolean); //remove all false values

    const imageUrl = imageUrlValue.value.trim();
    const imageAlt = imageAltUrlValue.value.trim();

    if (imageUrl && !imageUrl.startsWith("http")) {
      alert("Please enter a valid image URL starting with http:// or https://");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }
    if (imageUrl && !looksLikeImageUrl(imageUrl)) {
      alert(
        "Please paste a direct image URL (ending in .jpeg/ .png/ .webp, etc.)",
      );
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    const payload = {
      title: titleValue.value.trim(),
      body: bodyValue.value.trim(),
      ...(tags.length ? { tags } : {}), // Using spread operator
      ...(imageUrl ? { media: { url: imageUrl, alt: imageAlt } } : {}),
    };

    try {
      const res = await createPost(payload);

      const created = res.data;

      addPostForm.reset();
      modal.classList.remove("hidden");

      setTimeout(() => {
        modal.classList.add("hidden");
      }, 5000);

      modal.querySelector("h2").textContent = "Post Created!";
      modal.querySelector("p").textContent =
        `"${created.title}" was successfully posted`;
    } catch (error) {
      alert(`Create post error: ${error.message}`);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.location.href = "./index.html";
  });
}
