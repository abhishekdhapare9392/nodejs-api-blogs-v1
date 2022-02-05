const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From NodeJS World!");
});

const blogs = [
  {
    id: "1",
    title: "Blog Title 1",
    body: "Blog 1 Body",
  },
  {
    id: "2",
    title: "Blog Title 2",
    body: "Blog 2 Body",
  },
  {
    id: "3",
    title: "Blog Title 3",
    body: "Blog 3 Body",
  },
];
app.get("/api/v1/blogs", (req, res) => {
  res.status(200).json(blogs);
});

app.listen(3000, () => {
  console.log(`Server is runing on port 3000`);
});
