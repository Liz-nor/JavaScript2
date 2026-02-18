import { HomePage } from "../pages/index.js";
import { ProfilePage } from "../pages/profile.js";
import { LoginPage } from "../pages/login.js";
import { RegisterPage } from "../pages/register.js";
import { CreatePostPage } from "../pages/createPost.js";
import { SinglePostPage } from "../pages/singePost.js";

export const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/create": CreatePostPage,
  "/post": SinglePostPage,
};
