const COINS_API = 'https://api.coingecko.com/api/v3/coins/list?include_platform=true';
const COINS_API_PING = 'https://api.coingecko.com/api/v3/ping';
import https from 'https';
;
;
const fetch = (address) => {
    return new Promise((resolve) => {
        let data = '';
        https.get(address, res => {
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                resolve(data);
            });
        });
    });
};
const getTokenList = async () => {
    const ping = await fetch(COINS_API_PING);
    const pingResult = JSON.parse(ping);
    if (!('gecko_says' in pingResult)) {
        throw new Error('Gecko API ping failed');
    }
    const json = await fetch(COINS_API);
    const result = JSON.parse(json);
    return result;
};
export { getTokenList };
