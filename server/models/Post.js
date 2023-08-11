import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      required: true,
    },
    userPicturePath: {
      type: String,
      required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
