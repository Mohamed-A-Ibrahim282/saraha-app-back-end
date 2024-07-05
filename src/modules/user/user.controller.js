import { User } from "../../../dbConnection/models/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { sendEmails } from "../../email/email.js"
import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"

// signup
const signup = catchError(async (req, res, next) => {
    //generate random 6 numbers
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // otp expire after 3 mins
    const otpExpires = new Date(Date.now() + 3 * 60000);

    const user = new User({ ...req.body, otp, otpExpires });
    await user.save();
    user.password = undefined;

    sendEmails(req.body.email, otp);

    res.status(201).json({ message: "Success", user });
});

const otpVerify = catchError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new appError("User not found", 401));
  
    if (user.otpVerified == true)
      return next(new appError("You are verified", 409));
  
    if (user.otp !== req.body.otp) return next(new appError("worng otp"), 401);
  
    // if otp expire send new otp to mail
    if (user.otpExpires < new Date()) {
      //generate random 6 numbers
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      // otp expire after 3 mins
      const newOtpExpires = new Date(Date.now() + 3 * 60000);
  
      user.otp = newOtp;
      user.otpExpires = newOtpExpires;
      await user.save();
  
      sendEmails(email, newOtp);
      return next(new appError("otp expired please insert the new one"), 401);
    }
  
    user.otpVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    res.status(200).json({ message: "Email verified" });
  });

// signin
const signin = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });

    if (!user || !bcrypt.compareSync(req.body.password, user.password))
        return next(new appError(`incorrect email or password`, 401))

    jwt.sign({ userId: user._id, name: user.name, role: user.role }, "sarahaApp", (err, token) => {
        res.json({ message: "success", token })
    })
})

const getAllUsers = catchError(async (req, res) => {
    let users = await User.find()
    res.status(200).json(users)
})

const updateUser = catchError(async (req, res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ message: "success", user })
})

const deleteUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) return next(new appError(`user not found`, 401))

    res.status(200).json({ message: "success", user })
})


export {
    signup,
    signin,
    getAllUsers,
    updateUser,
    deleteUser,
    otpVerify
}