import { homeView } from "../pages/homeView.js";
import { productsPage } from "../pages/products.js";
import { loginPage } from "../pages/login.js";
import { profilePage } from "../pages/profile.js";
import { registerPage } from "../pages/register.js";

export const routes = {
  "/": homeView,
  "/products": productsPage,
  "/login": loginPage,
  "/profile": profilePage,
};
