import { Router } from "express";
import { deleteMessage, getUserMessages, sendMessage, updateMessage } from "./message.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { massageValidation } from "./message.validation.js";




const messageRouter = Router()

messageRouter.post('/', validate(massageValidation), sendMessage)
messageRouter.put('/:id', verifyToken, updateMessage)
messageRouter.delete('/:id', verifyToken, deleteMessage)
messageRouter.get('/', verifyToken, getUserMessages)

export default messageRouter