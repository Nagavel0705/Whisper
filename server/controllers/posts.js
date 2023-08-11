import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try{
        const {userId, location, caption, picturePath} = req.body;

        const user = User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location,
            caption,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post);

    } catch(err){
        res.status(409).json({message: err.message});
    }
};

// READ
export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);
    } catch(err){
        res.status(404).json({message: err.message});
    }
};

export const getUserPosts = async (req,res) => {
    try{

        const { userId } = req.params;
        const posts = Post.find({userId: userId});
        res.status(200).json(posts);

    } catch(err){
        res.status(404).json({message: err.message});
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try{

        const { postId } = req.params;
        const { userId } = req.body;
        
        const post = await Post.findById(postId);

        const isLiked = post.likes.get(userId);

        if(isLiked) post.likes.delete(userId);
        else post.likes.set(userId, true);

        const updatedPosts = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPosts);

    } catch(err){
        res.status(404).json({message: err.message});
    }
}