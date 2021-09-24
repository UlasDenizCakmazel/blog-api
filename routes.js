const express = require("express");
const Post = require("./models/Post");
const router = express.Router();
const Comment = require("./models/Comment");

router.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.post("/posts", async function (req, res) {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    await post.save();
    res.send(post);
});

router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        res.send(post);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

router.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });

        if (req.body.title) {
            post.title = req.body.title;
        }

        if (req.body.content) {
            post.content = req.body.content;
        }

        await post.save();
        res.send(post);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

router.delete("/posts/:id", async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});


router.post("/posts/:id/comments", async (req, res) => {
    try {
        const comment = new Comment({ content: req.body.content, blog: { id: req.params.id } });
        await comment.save();
        res.send(comment);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

router.get("/comments", async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

module.exports = router;