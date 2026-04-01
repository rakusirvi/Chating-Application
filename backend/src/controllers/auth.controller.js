import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export async function SignUpAuth(req, res) {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({
        message: "All Fields are Required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: " Password must be at Least 6 Characters",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      fullName,
      password: hashPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({
        message: "Failed to Create User or Invalid data",
      });
    }
  } catch (error) {
    console.log("Error in SignUpAuth", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function LoginAuth(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All Fields are Required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in LoginAuth", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export function LogoutAuth(req, res) {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in LogoutAuth", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function UpdateAuth(req, res) {
  const { profilePic } = req.body;

  if (!profilePic) {
    return res.status(400).json({
      message: "Profile Picture is Required",
    });
  }

  try {
    const userID = req.user._id;

    const result = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        profilePic: result.secure_url,
      },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in UpdateAuth", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function checkAuth(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in checkAuth", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
