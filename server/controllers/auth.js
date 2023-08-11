import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER USER

export const register = async (req, res) => {
    try{

        const {
            firstName,
            lastName,
            location,
            occupation,
            email,
            password,
            picturePath,
        } = req.body;

        console.log(picturePath);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 10000),
            email,
            password: hashedPassword,
            picturePath,
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json(err.message);
    }
};

// LOGIN USER

export const login = async(req, res) => {
    try{

        const { email, password } = req.body;
    
        const existingUser = await User.findOne({ email: email });

        if(!existingUser){
            res.status(400).json({ message: "User does not exist" });
        } else {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if(!isMatch){
                res.status(400).json({ message: "Invalid credentials" });
            } else {
                const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
                  
                res.status(200).json({ user: existingUser, token });
            }
        }

    } catch(err){
        res.status(500).json(err);
    }
};