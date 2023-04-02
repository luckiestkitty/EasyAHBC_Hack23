'use strict';

const {
    utils: { deployContract },
} = require('@axelar-network/axelar-local-dev');

const InterPalacesNFT = rootRequire('./artifacts/examples/evm/interPalaces-nft/InterPalacesNFT.sol/InterPalacesNFT.json');

async function deploy(chain, wallet) {
    console.log(`Deploying InterPalacesNFT for ${chain.name}.`);
    chain.contract = await deployContract(wallet, InterPalacesNFT, [chain.gateway, chain.gasService]);
    chain.wallet = wallet;
    console.log(`Deployed InterPalacesNFT for ${chain.name} at ${chain.contract.address}.`);


}

async function execute(chains, wallet, options) {

    console.log("wallet: ", wallet.address);


    const args = options.args || [];
    const { source, destination, calculateBridgeFee } = options;

    // premint on source contract 
    const tokenURI = 'https://fluin.io/assets/speakers/0.json';
    const tokenId = 0;
    const mintTx = await source.contract.safeMint(wallet.address, tokenURI, tokenId);
    console.log("source chain safemint token tx: ", mintTx);

    const message = args[2] || `Hello ${destination.name} from ${source.name}, it is ${new Date().toLocaleTimeString()}.`;

    async function logValue() {
        console.log('Source chain is:', source.name);
        console.log(` URL of token 0 is "${await source.contract.tokenURI(tokenId)}"`);
        console.log(` NFT connection to ${await source.contract.remoteChain()} ${await source.contract.remoteAddress()} `)
        console.log('Destination chain:', destination.name);
        // console.log(` URL of token 0 is "${await destination.contract.tokenURI(0)}"`);
        console.log(` NFT connection to ${await destination.contract.remoteChain()} ${await destination.contract.remoteAddress()} `);
        console.log('-');
    }

    console.log('--- Initially ---');
    await logValue();

    const fee = await calculateBridgeFee(source, destination);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const tx = await source.contract.connectNFTs(destination.name, destination.contract.address, {
        value: fee
    });
    await tx.wait();

    console.log('Remote connection created successfully!');

    const newURI = 'https://fluin.io/assets/speakers/4.json';
    let tx2 = await source.contract.teleportPalace(tokenId, newURI, {
        value: fee,
    });
    await tx2.wait();
    while (await destination.contract.tokenURI(0) !== newURI) {
        await sleep(1000);
    }

    
    const destinationTokenURI = await destination.contract.tokenURI(0);
    console.log('Teleport NFT Updates successful!');
    console.log('Destianation chain tokenURI: ',  destinationTokenURI);

    await logValue();
}

module.exports = {
    deploy,
    execute,
};