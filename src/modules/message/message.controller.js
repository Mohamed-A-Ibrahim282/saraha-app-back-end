import { catchError } from '../../middleware/catchError.js';
import { appError } from '../../utils/appError.js';
import { Message } from './../../../dbConnection/models/message.model.js';

const sendMessage = catchError(async (req, res) => {
    let messageContent = await Message.insertMany(req.body)
    res.status(201).json({ message: "success", messageContent })
})

const updateMessage = catchError(async (req, res) => {
    let messageContent = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ message: "success", messageContent })
})

const deleteMessage = catchError(async (req, res, next) => {
    let messageContent = await Message.findByIdAndDelete(req.params.id)
    if (!messageContent) return next(new appError(`message not found`, 401))
    res.status(200).json({ message: "success", messageContent })
})

const getUserMessages = catchError(async (req, res) => {
    let userMessages = await Message.find({ resrver_id: req.logedUser.userId })
    res.status(200).json({ message: "success", userMessages })
})


export {
    sendMessage,
    updateMessage,
    deleteMessage,
    getUserMessages
}