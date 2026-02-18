import { Router } from "./Router.js";
import { startRouter } from "./router.js";

renderNavbar();
startRouter();

window.addEventListener("route:loaded", (e) => {
  const path = e.detail.path;

  if (path === "/create") initCreatePost();
  if (path === "/profile") initProfilePage();
  if (path === "/login") initLoginPage();
  if (path === "/register") initRegisterPage();
  if (path === "/post") initSinglePostPage();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

// Get the element where content will be rendered
const contentElement = document.getElementById("app-content");

// Create an instance of our Router
const router = new Router(routes, contentElement);

// Handle initial page load
router.resolveRoute();

// Hijack link clicks
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const path = event.target.getAttribute("href");
    router.navigate(path);
  });
});
