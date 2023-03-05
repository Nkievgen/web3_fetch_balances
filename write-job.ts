import fs from 'fs';
import { getNativeAndTokens } from './get-balance.js';

interface jobOptions {
    address: string
}

const write = async () => {
    const buffer: Buffer = await fs.promises.readFile('job-config.json');
    const options: jobOptions = JSON.parse(String(buffer));
    if ('address' in options) {
        if (options.address === '') {
            throw new Error('Address in job-config.json is an empty string')
        }
    } else {
        throw new Error('Failed to get an address from job-config.json');
    }
    const address = options.address;
    const startDate = new Date().toUTCString();
    const balance = await getNativeAndTokens(address);
    const finishDate = new Date().toUTCString();
    const writeObject = {
        address: address,
        time: {
            start: startDate,
            end: finishDate
        },
        balance: balance,
    };
    await fs.promises.writeFile('balance.json', JSON.stringify(writeObject));
};

export default write;