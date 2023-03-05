import { getNativeAndTokens } from './get-balance.js';
const controller = async (req, res, next) => {
    let addressQuery = req.query.address;
    if (typeof addressQuery !== 'string') {
        return next(new Error('Please provide an address in a query parameter'));
    }
    const address = addressQuery;
    const balance = await getNativeAndTokens(address);
    res.status(200).json({
        message: 'Balances fetched successfuly',
        data: balance
    });
};
const errorHandler = async (error, req, res, next) => {
    res.status(500).json({
        message: error.message || 'Internal server error'
    });
};
export { controller, errorHandler };
