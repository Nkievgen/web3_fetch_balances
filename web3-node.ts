import Web3 from 'web3';

import dotenv from 'dotenv';
dotenv.config();

const provider = process.env.PROVIDER;

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

export default web3;