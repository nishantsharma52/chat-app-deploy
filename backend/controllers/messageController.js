import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// --- SEND MESSAGE ---
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        };

        await Promise.all([gotConversation.save(), newMessage.save()]);

        // SOCKET IO: Naya message bhejte waqt
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.log("Error in sendMessage:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// --- GET MESSAGES (Filtered for 'Delete for Me') ---
export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        // Populate mein match lagaya hai taaki 'deletedBy' waale messages na dikhein
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({
            path: "messages",
            match: { deletedBy: { $nin: [senderId] } } // Hamari ID deletedBy array mein nahi honi chahiye
        });

        if (!conversation) return res.status(200).json([]);

        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessage:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// --- DELETE MESSAGE (Me vs Everyone) ---
export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params; // Message ID
        const { type } = req.body; // 'me' ya 'everyone'
        const userId = req.id; // Login user ID (from middleware)

        const message = await Message.findById(id);
        if (!message) return res.status(404).json({ success: false, message: "Message not found" });

        if (type === 'everyone') {
            // Check: Sirf sender hi everyone ke liye delete kar sakta hai
            if (message.senderId.toString() !== userId.toString()) {
                return res.status(401).json({ success: false, message: "You can't delete this for everyone" });
            }

            const otherUserId = message.receiverId;
            await Message.findByIdAndDelete(id);

            // REAL-TIME SIGNAL: Saamne wale ki screen se uda do
            const otherUserSocketId = getReceiverSocketId(otherUserId);
            if (otherUserSocketId) {
                io.to(otherUserSocketId).emit("messageDeleted", id);
            }
        } else {
            // 'Delete for Me': Message rahega, bas hamari ID 'deletedBy' mein add ho jayegi
            await Message.findByIdAndUpdate(id, { $addToSet: { deletedBy: userId } });
        }

        return res.status(200).json({
            success: true,
            message: `Message deleted for ${type === 'everyone' ? 'everyone' : 'me'}.`
        });
    } catch (error) {
        console.log("Error in deleteMessage:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};