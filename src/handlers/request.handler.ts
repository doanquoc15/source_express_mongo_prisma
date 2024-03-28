import { validationResult } from 'express-validator';

const requestHandler = (req : any, res:any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            message: errors.array()[0].msg,
        });

    next();
};

export default requestHandler;