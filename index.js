const express = require("express");
require("dotenv").config();
const Blog = require("./models/Blog");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello From NodeJS World!");
});

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, () => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/v1/blogs", async (req, res) => {
  try {
    const blogs = Blog.find({});
    res.status(200).json({
      status: 200,
      error: false,
      data: blogs,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog.save();
  res.status(201).json(blog);
});

app.get(`/api/v1/blogs/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.find({ _id: id });
    res.status(200).json({
      status: 200,
      error: false,
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request",
    });
  }
});

app.patch(`/api/v1/blogs/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBlog = await Blog.updateOne(
      { _id: id },
      { $set: { title: req.body.title, body: req.body.body } },
    );

    res.status(200).json({
      status: 200,
      error: false,
      message: "Blog Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request",
    });
  }
});

app.delete(`/api/v1/blogs/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBlog = await Blog.deleteOne({ _id: id });

    res.status(200).json({
      status: 200,
      error: false,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
