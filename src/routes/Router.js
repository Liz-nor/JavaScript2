import { notFoundView } from "../../views.js";

export class Router {
  constructor(routes, contentElement) {
    this.routes = routes;
    this.contentElement = contentElement;

    // Listen for back/forward navigation
    window.addEventListener("popstate", () => this.resolveRoute());
  }

  // Called when a user clicks a link
  navigate(path) {
    history.pushState({}, "", path);
    this.resolveRoute();
  }

  // Find the correct view and render it
  resolveRoute() {
    const path = window.location.pathname;
    // Find the view function for the current path, or use the 404 view
    const view = this.routes[path] || notFoundView;

    // Render the view's content into our target element
    this.contentElement.innerHTML = view();
  }
}
