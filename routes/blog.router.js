const { Router } = require("express");
const Blog = require("../models/blog.model");

const router = Router();

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", async (req, res) => {
  const { title, body, coverImage } = req.body;
  await Blog.create({
    title, body, coverImage
  });
  return res.redirect("/");
});

module.exports = router;
