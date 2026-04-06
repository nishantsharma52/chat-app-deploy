import express from "express"
import { getMessage, sendMessage, deleteMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);

// Agar tu frontend se "/api/v1/message/get/:id" call kar raha hai, toh yahan "/get/:id" kar dena
router.route("/:id").get(isAuthenticated, getMessage);

// --- IS LINE KO CHANGE KIYA HAI (.delete se .post) ---
router.route("/delete/:id").post(isAuthenticated, deleteMessage); 

export default router;