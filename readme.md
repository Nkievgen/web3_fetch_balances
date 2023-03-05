A simple API app that fetches token addresses from Gecko API and then fetches balances of each token for a given address.

To configure the app create a *.env file in the root folder and provide a listen port in a PORT variable and a ethereum node address for web3.js library in a PROVIDER variable. Also install dependencies via 'npm install --save' command.

API can be launched via 'node dist/index.js' command or 'npm start'.
API listens for requests on /balance route, requests should have 'address' query parameter that specify the wallet address.
Request example:
https://localhost:3000/balance?address=0xA145ac099E3d2e9781C9c848249E2e6b256b030D

Answer example:
{
        message: 'Balances fetched successfuly',
        data: [
            {
                "token": {
                    "id": "ethereum",
                    "symbol": "eth",
                    "name": "Ethereum"
                },
                "balance": "0.000002366788536"
            },
            {
                "token": {
                    "id": "gsenetwork",
                    "symbol": "gse",
                    "name": "GSENetwork",
                    "address": "0xe530441f4f73bdb6dc2fa5af7c3fc5fd551ec838"
                },
                "balance": "92"
            },
            ...
        ]
    }

To configure the write job, set an address in job-config.json in the "address" property.
Write job can be launched via 'node dist/write-job-schedule.js' or 'npm run write' commands. It will write fetched data in the balance.json file within a one minute interval after end of each job.
