const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

//save posts 

router.post('/post/save', async (req, res) => {
    try {
      const newPost = new Posts(req.body);
      await newPost.save();
      return res.status(200).json({
        success: "Posts saved successfully"
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message
      });
    }
  });

//get posts

router.get('/posts', async (req, res) => {
    try {
      const posts = await Posts.find().exec();
      return res.status(200).json({
        success: true,
        existingPosts: posts
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message
      });
    }
  });

//update posts

router.put('/post/update/:id', (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(() => {
        res.status(200).json({
          success: 'Updated successfully',
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          error: 'An error occurred while updating the post',
        });
      });
  });

//delete post

router.delete('/post/delete/:id', async (req, res) => {
    try {
      const deletedPost = await Posts.findByIdAndRemove(req.params.id).exec();
      return res.json({ message: "Delete Succesfull", deletedPost });
    } catch (err) {
      return res.status(400).json({ message: "Delete unsuccessful", err });
    }
  });


module.exports = router;