import { notFoundView } from "../../views.js";
import { routes } from "./routes.js";

export function navigate(path) {
  window.history.pushState({}, "", path);
  renderRoute();
}

export function renderRoute() {
  const app = document.getElementById("app");
  const path = window.location.pathname;

  const page = routes[path] || routes["/"];
  app.innerHTML = page();

  window.dispatchEvent(new CustomEvent("route:loaded", { detail: { path } }));
}

export function startRouter() {
  window.addEventListener("popstate", renderRoute);

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || !href.startWith("/")) return;

    e.preventDefault();
    navigate(href);
  });
  renderRoute();
}
