import { Router } from "express";
import { signup, deleteUser, getAllUsers, updateUser, signin } from "./user.controller.js";
import { checkEmailExist } from './../../middleware/checkEmailExist.js';
import { validate } from "../../middleware/validate.js";
import { signinValidation, signupValidation } from "./user.validation.js";




const userRouter = Router()

userRouter.post('/signup', validate(signupValidation), checkEmailExist, signup)
userRouter.post('/signin', validate(signinValidation), signin)
userRouter.get('/', getAllUsers)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)





export default userRouter