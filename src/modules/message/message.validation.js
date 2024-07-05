import joi from 'joi';


export const massageValidation = joi.object({
    message: joi.string().min(2).max(100).required(),
    resrver_id: joi.string().length(24).required()
});