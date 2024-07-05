import bcrypt from 'bcrypt'
import { User } from '../../dbConnection/models/user.model.js'
import { appError } from '../utils/appError.js'


export const checkEmailExist = async (req, res, next) => {
    let findEmail = await User.findOne({ email: req.body.email })
    if (findEmail) return next(new appError('email already exists', 409))  
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}