import express from 'express';
import { controller, errorHandler } from './middlewares.js';
import dotenv from 'dotenv';
dotenv.config();
const port = Number(process.env.PORT);
const provider = process.env.provider;
if (Number.isNaN(port)) {
    throw new Error('Failed to get a port number from the .env file');
}
if (typeof provider === 'undefined') {
    throw new Error('Failed to get a web3 provider from the .env file');
}
const app = express();
app.get('/balance', controller);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
