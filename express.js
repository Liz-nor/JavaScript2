import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("You have successfully connected to the server");
});

app.post("/profile", (req, res) => {
  console.log(req.body);
  res.send("Profile created successfully");
});

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
