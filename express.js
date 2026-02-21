import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("You have successfully connected to the server");
});

app.post("/profile", (req, res) => {
  res.send("Profile created successfully");
});

app.listen(port, () => {});
