// genreController.js

var Genre = require("../models/genre");
const { body, validationResult } = require("express-validator");

// display list of all genres
exports.genre_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre list");
};

// display detail page for a specific genre
exports.genre_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre detail: " + req.params.id);
};

// display genre create form on GET
exports.genre_create_get = function (req, res, next) {
  res.render("genre_form", { title: "Create Genre" });
};

// handle genre create on POST
exports.genre_create_post = [
  body("name", "Genre name required.").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    var genre = new Genre({ name: req.body.name });
    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) {
          return next(err);
        }
        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          genre.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

// display genre delete form on GET
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// handle genre delete on POST
exports.genre_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// display genre update form on GET
exports.genre_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// handle genre update on POST
exports.genre_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
