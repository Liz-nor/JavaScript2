import { generatePosts } from "../pages/index.js";
let allPosts = [];
let currentPage = 1;
const postsPerPage = 12;

const container = document.getElementById("container");
const pageNumberSpan = document.getElementById("page-number");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function displayPage(page) {
  if (!container) return;

  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const pagePosts = allPosts.slice(startIndex, endIndex);

  container.innerHTML = "";
  generatePosts(pagePosts);

  // Update pagination controls
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  if (pageNumberSpan) {
    pageNumberSpan.textContent = `Page ${page} of ${totalPages || 1}`;
  }

  if (prevBtn) prevBtn.disabled = page <= 1;
  if (nextBtn) nextBtn.disabled = page >= totalPages;

  window.scrollTo({ top: 0, behavior: "smooth" });

  return pagePosts;
}

function setAllPosts(posts) {
  allPosts = posts;
  currentPage = 1;
  displayPage(currentPage);
}

function nextPage() {
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", prevPage);
  nextBtn.addEventListener("click", nextPage);
} else {
  console.warn("Pagination buttons not found");
}

export { currentPage, postsPerPage, displayPage, setAllPosts };
