import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from '../../config/config.js';


export const registerUser = async  (req,res) => {
    const {name, email, password} = req.body;
    try{
        // verify if the email already uses
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(404).json({message: "Email already exists"});

        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        //new user
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User created",
            user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
    }catch (err){
        return res.status(500).json({message: "Something goes wrong"});
    }

}


export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({message: "Email doesn't found"});


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({success:false ,message: "Password doesn't match"});

        const token = jwt.sign(
            {id:user._id, name:user.name},
            JWT_SECRET_KEY,
            {expiresIn: '1h'}
        );
        res.status(200).json({
            success: true,
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            },
            token
        });
    }catch(err){
        return res.status(500).json({message: "Something goes wrong"});
    }
};