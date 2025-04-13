import cloudinary from 'cloudinary'
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/dataUri.js';

// register user
export const register = async (req, res) => {
    try {
        const avatarFile = req.files?.avatar?.[0];
        const resumeFile = req.files?.resume?.[0];

        const avatarUri = getDataUri(avatarFile);
        const resumeUri = getDataUri(resumeFile);

        const uploadedAvatar = await cloudinary.v2.uploader.upload(avatarUri.content);
        const uploadedResume = await cloudinary.v2.uploader.upload(resumeUri.content);

        const { name, email, password, role, skill, bio, phoneNumber, resume } = req.body;
        if (!name || !email || !password || !role || !skill || !bio || !phoneNumber) {
            return res.status(404).json({
                message: 'Please Fill above Fields'
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,   
            password: hashedPassword,
            role,
            avatar: {
                public_id: uploadedAvatar.public_id,
                url: uploadedAvatar.secure_url
              },
              resume: {
                public_id: uploadedResume.public_id,
                url: uploadedResume.secure_url
              },
            skill,
            bio,
            phoneNumber
        });
        return res.status(201).json({
            message: 'Account created Successfully'
        })
    } catch (error) {
        console.log(error)
    }
}
// login user
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(404).json({
                message: 'Please Fill above Fields'
            })
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: 'No User exist with this role'
            })
        }
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

       const myUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, 
            avatar: user.avatar,
            resume: user.resume,
            bio: user.bio,
            skill: user.skill,
            phoneNumber: user.phoneNumber
        }
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: `Welcome back ${user.name}`,
            myUser
        })

    } catch (error) {
        console.log(error)
    }
}
// logout user
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfully.",
        })
    } catch (error) {
        console.log(error)
    }
}
// update profile
export const updateProfile = async (req, res) => {
    try {
        const avatarFile = req.files?.avatar?.[0];
        const resumeFile = req.files?.resume?.[0];

        const avatarUri = getDataUri(avatarFile);
        const resumeUri = getDataUri(resumeFile);

        const uploadedAvatar = await cloudinary.v2.uploader.upload(avatarUri.content);
        const uploadedResume = await cloudinary.v2.uploader.upload(resumeUri.content);

        const userId = req.id
        const userData = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            bio: req.body.bio,
            skill: req.body.skill,
            avatar:{
                public_id: uploadedAvatar.public_id,
                url: uploadedAvatar.secure_url
            },
            resume:{
                public_id: uploadedResume.public_id,
                url: uploadedResume.secure_url
            }
        }
        const user = await User.findByIdAndUpdate(userId, userData, {
            new:true,
            runValidators: true
        })    
       
        res.status(200).json({
            success: true,
            message: 'profile updated',
            user
        })
    } catch (error) {
        console.log(error)
    }
}