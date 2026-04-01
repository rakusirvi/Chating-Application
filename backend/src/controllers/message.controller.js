import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export async function getUsersForSidebar(req, res) {
  try {
    const LoggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: LoggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUsersForSidebar", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getMessages(req, res) {
  try {
    const { id } = req.params;
    const myID = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myID, receiverId: id },
        { senderId: id, receiverId: myID },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function sendMessage(req, res) {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO : to implement socket.io for real-time functionality
    res.status(201).json(newMessage);
    
  } catch (error) {
    console.log("Error in sendMessage", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
