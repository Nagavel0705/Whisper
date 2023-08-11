import User from '../models/User.js';

// ADD
export const getUser = async (req,res) => {

    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err){
        res.status(404).json({message: err.message});
    }

};

export const getUserFriends = async (req,res) => {

    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
        const formatted = friends.map(
            ({_id, firstName, lastName, location, bio, picturePath}) => {
                return {_id, firstName, lastName, location, bio, picturePath};
            }
        );
        
        res.status(200).json(formatted);

    } catch(err){
        res.status(404).json({message: err.message});
    }
};


// UPDATE 
export const addRemoveFriends = async (req,res) => {
    try{

        const {id, friendId} = req.params;
        console.log(id, friendId);
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
        const formatted = friends.map(
            ({_id, firstName, lastName, location, bio, picturePath}) => {
                return {_id, firstName, lastName, location, bio, picturePath};
            }
        );

        res.status(201).json(formatted);
    } catch(err){
        res.status(404).json({message: err.message});
    }
};