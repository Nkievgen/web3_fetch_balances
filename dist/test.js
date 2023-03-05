import { getTokenBalance } from './get-balance.js';
const ALLME_ADDRESS = '0x47140a767a861f7a1f3b0dd22a2f463421c28814';
const WALLET_ADDRESS = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
const test_token = {
    id: 'test',
    symbol: 'test',
    name: 'test',
    platforms: {
        ethereum: ALLME_ADDRESS
    }
};
try {
    const balance = await getTokenBalance(WALLET_ADDRESS, test_token);
    console.log('balance: ', balance);
}
catch (error) {
    console.log(error);
}
