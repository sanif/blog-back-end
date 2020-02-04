/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Post schema
 */

const PostSchema = new Schema({
  userId: { type: Number, default: "" },
  id: { type: Number, default: "" },
  title: { type: String, default: "" },
  body: { type: String, default: "" }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

PostSchema.method({});

/**
 * Statics
 */

PostSchema.static({});

/**
 * Register
 */

mongoose.model("Post", PostSchema);
