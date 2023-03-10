import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
const provider = process.env.PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const ABI = [
    // balanceOf
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
];
export { web3 };
