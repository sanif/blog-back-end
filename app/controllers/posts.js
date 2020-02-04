/*!
 * Module dependencies.
 */

const axios = require("axios");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

exports.index = function(req, res) {
  Post.find({}, (err, posts) => {
    console.log("Count", posts.length);
    var itemsProcessed = 0;
    posts.forEach((post, index, array) => {
      User.findOne({ id: post.userId }, (err, user) => {
        itemsProcessed++;
        array[index] = { ...post, user };
        if (itemsProcessed === array.length) {
          res.render("posts/index", {
            title: "Posts",
            posts: posts,
            error: err
          });
        }
      });
    });

    if (posts.length == 0) {
      res.render("posts/index", {
        title: "Posts",
        posts: []
      });
    }
  });
};

exports.sync = function(req, res) {
  const postsApi = axios.get("https://jsonplaceholder.typicode.com/posts");
  const usersApi = axios.get("https://jsonplaceholder.typicode.com/users");
  axios
    .all([postsApi, usersApi])
    .then(
      axios.spread((...responses) => {
        const postResponse = responses[0];
        const userResponse = responses[1];
        addToDb(postResponse.data, userResponse.data);
        res.render("posts/sync", {
          title: "Posts",
          status: "Synched successfully"
        });
      })
    )
    .catch(errors => {
      // react on errors.
      res.render("posts/sync", {
        title: "Posts",
        status: "Synch Failed " + errors
      });
    });
};

const addToDb = (posts, users) => {
  Post.deleteMany({}, () => {
    console.log("Deleted");
    Post.collection.insertMany(posts, (err, r) => {
      console.log("Count post", r.insertedCount);
    });
  });

  User.deleteMany({}, () => {
    console.log("Deleted");
    User.collection.insertMany(users, (err, r) => {
      console.log("Count user", r.insertedCount);
    });
  });
};
