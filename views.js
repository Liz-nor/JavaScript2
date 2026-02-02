export function homeView() {
  return "<h1>Welcome to the Home Page</h1>";
}

export function productsView() {
  return (
    "<h1>Our Products</h1>",
    "<p>Here are some of our finest products.</p>"
  );
}

export function notFoundView() {
  return "<h1>404 - Page Not Found</h1>";
}

import { ProductCard } from "./components.js";

// The view function is now 'async'
export async function productsView() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/old-games");
    if (!response.ok) throw new Error("Failed to fetch games");

    const result = await response.json();
    const games = result.data;

    // We map over the array of game data. For each game, we call our
    // ProductCard component, passing the game object as a prop.
    // This creates an array of HTML strings.
    const productCardsHtml = games
      .map((game) => ProductCard({ product: game }))
      .join("");

    // We return the final composed view.
    return ` 
      <h1>Classic Games</h1> 
      <section class="product-grid"> 
        ${productCardsHtml} 
      </section> 
    `;
  } catch (error) {
    console.error("Error fetching products:", error);
    return "<h1>Something went wrong</h1><p>Could not load products. Please try again later.</p>";
  }
}
