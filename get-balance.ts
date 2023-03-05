import { AbiItem } from 'web3-utils';
import web3 from './web3-node.js';
import {getTokenList, tokenObject} from './token.js';

interface balanceToken {
    id: string;
    symbol: string;
    name: string;
    address?: string;
}

interface balance {
    token: balanceToken;
    balance: string;
};

const minABI: AbiItem[] = [
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
        constant :true,
        inputs:[],
        name:"decimals",
        outputs:[{"name":"","type":"uint8"}],
        type:"function"
    }
  ];

const getNativeBalance = async (walletAddress: string): Promise<balance> => {
    const wei = await web3.eth.getBalance(walletAddress);
    const format = web3.utils.fromWei(wei);
    const currentBalance: balance = {
        token: {
            id: "ethereum",
            symbol: "eth",
            name: "Ethereum",
          },
        balance: format
    }
    return currentBalance;
}

const getTokenBalance = async (walletAddress: string, token: tokenObject): Promise<balance> => {
    const tokenAddress = token.platforms.ethereum;
    const contract = new web3.eth.Contract(minABI, tokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const decimals = await contract.methods.decimals().call();
    const format = balance / Math.pow(10, decimals)
    const currentBalance: balance = {
        token: {
            id: token.id,
            symbol: token.symbol,
            name: token.name,
            address: token.platforms.ethereum
        },
        balance: String(format)
    };
    return currentBalance;
}

const getTokenBalances = async (walletAddress: string, tokenList: tokenObject[]): Promise<balance[]> => {
    const nonZeroBalances: balance[] = [];
    for (const token of tokenList) {
        if (typeof token.platforms.ethereum !== 'undefined') {
            try {
                const result: balance = await getTokenBalance(walletAddress, token);
                const balanceNumber = Number(result.balance);
                if (balanceNumber > 0) {
                    nonZeroBalances.push(result);
                }
            } catch (error: unknown) {
                console.log(`failed to get the balance of ${token.name} token at address ${walletAddress}`);
            }
        }
    };
    return nonZeroBalances;
};

const getNativeAndTokens = async (address: string): Promise<balance[]> => {
    const nativeBalance: balance = await getNativeBalance(address);
    const tokenList: tokenObject[] = await getTokenList();
    const allBalance: balance[] = await getTokenBalances(address, tokenList);
    allBalance.unshift(nativeBalance);
    return allBalance;
};

export {getNativeAndTokens, getTokenBalances, getTokenBalance, getNativeBalance, balance};