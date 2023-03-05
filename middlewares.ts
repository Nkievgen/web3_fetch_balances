import { getNativeAndTokens } from './get-balance.js';
import { Request, Response, NextFunction } from 'express';

const controller = async (req: Request, res: Response, next: NextFunction) => {
    let addressQuery: any = req.query.address;
    if (typeof addressQuery !== 'string'){
        return next(new Error('Please provide an address in a query parameter'));
    }
    const address: string = addressQuery;
    const balance = await getNativeAndTokens(address);
    res.status(200).json({
        message: 'Balances fetched successfuly',
        data: balance
    });
};

const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: error.message || 'Internal server error'
    });
};

export { controller, errorHandler};