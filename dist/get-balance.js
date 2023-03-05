import web3 from './web3-node.js';
import { getTokenList } from './token.js';
;
const minABI = [
    //balanceOf
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
    // decimals
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ "name": "", "type": "uint8" }],
        type: "function"
    }
];
const getNativeBalance = async (walletAddress) => {
    const wei = await web3.eth.getBalance(walletAddress);
    const format = web3.utils.fromWei(wei);
    const currentBalance = {
        token: {
            id: "ethereum",
            symbol: "eth",
            name: "Ethereum",
        },
        balance: format
    };
    return currentBalance;
};
const getTokenBalance = async (walletAddress, token) => {
    const tokenAddress = token.platforms.ethereum;
    const contract = new web3.eth.Contract(minABI, tokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const decimals = await contract.methods.decimals().call();
    const format = balance / Math.pow(10, decimals);
    const currentBalance = {
        token: {
            id: token.id,
            symbol: token.symbol,
            name: token.name,
            address: token.platforms.ethereum
        },
        balance: String(format)
    };
    return currentBalance;
};
const getTokenBalances = async (walletAddress, tokenList) => {
    const nonZeroBalances = [];
    for (const token of tokenList) {
        if (typeof token.platforms.ethereum !== 'undefined') {
            try {
                const result = await getTokenBalance(walletAddress, token);
                const balanceNumber = Number(result.balance);
                if (balanceNumber > 0) {
                    nonZeroBalances.push(result);
                }
            }
            catch (error) {
                continue;
            }
        }
    }
    ;
    return nonZeroBalances;
};
const getNativeAndTokens = async (address) => {
    const nativeBalance = await getNativeBalance(address);
    const tokenList = await getTokenList();
    const allBalance = await getTokenBalances(address, tokenList);
    allBalance.unshift(nativeBalance);
    return allBalance;
};
export { getNativeAndTokens, getTokenBalances, getTokenBalance, getNativeBalance };
