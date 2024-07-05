import joi from 'joi';


export const signupValidation = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
});

export const signinValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
});