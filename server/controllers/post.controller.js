const db = require("../models");
const Post = db.posts;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });

    return;
  }
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    createdBy: req.body.createdBy,
  });

  post
    .save(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the POST.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Post.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving POSTs.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found POST with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving POST with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update POST with id=${id}. Maybe POST was not found!`,
        });
      } else res.send({ message: "POST was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating POST with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete POST with id=${id}. Maybe POST was not found!`,
        });
      } else {
        res.send({
          message: "POST was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete POST with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Post.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Posts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
