# MindGrowing Gardens

## Problem

People are constantly under tremendous pressure and stress in their everyday lives, with few options for coping. As a result, there is a growing need for a platform where people can express their emotions, receive support, and begin to heal.

## Our Unique Solution

Create three Mindgrowing growing gardens: Each garden offers a unique approach to healing, featuring equivalent quotes and wisdom, positive psychology solutions, and artistic inspiration.

With mindgrowing garden, users can express their feels and our platform will match cognitive tools and knowledge resources they need to create their own personalized art, reflecting their individual journey towards healing and recovery. From equivalent quotes and wisdom to positive psychology solutions and artistic inspiration, our platform empowers people to take control of their emotional wellbeing with newfound strength and resilience. 

Join us in our mission to chane lives and create a more mentally leahlthy world, welcome to Mindgrowing Gardens

## Technical Overview

Technical Design Diagram: https://excalidraw.com/#room=2f85241dc382a7c56f5c,VUiWxvfJMZ_zBDl_P7IBzQ

The garden is composed of various palaces (NFTs), such as the Art Palace, Philosophy Palace, and others. Each palace is situated on a specific blockchain. For instance, the Art Palace is on Ethereum, while the Philosophy Palace is on Algorand. The NFT serves as a representation of the materials housed within each palace. Suppose a user is presently inside the Art Palace (located on Ethereum) and desires to access the Philosophy Palace. In that case, they can use Axelar's inter-chain technology to teleport (convert) their Art NFT on Ethereum to a Philosophy NFT on Algorand.

The images currently generated by Openai by input the prompts (https://github.com/luckiestkitty/EasyAHBC_Hack23/blob/main/mindgrowing-backend/src/app.service.ts).

## How Sponsors Tech Power US

Garndens NFT contracts deployed on Ethereum and Algorand using Thirdweb NFT mint SDK and websites.

Contract on Alogrand Mikomeda Testnet: 
- https://testnet-algorand-rollup.a1.milkomeda.com/address/0x6ed5AA348b93022D0f117823f2F7525EecA526fd
- Thirdweb page: https://thirdweb.com/milkomeda-a1-testnet/0x6ed5AA348b93022D0f117823f2F7525EecA526fd/nfts

Contract on Etherum Goerli Testnet: 
- https://goerli.etherscan.io/token/0xd37fc110e4f1d12ba267d0b30a66acb983a08924
- Thirdweb page: https://thirdweb.com/goerli/0xD37fc110E4f1D12Ba267D0b30a66acb983A08924/nfts

In addition, the contracts can be also created and deployed through Thirweb CLI (https://github.com/luckiestkitty/EasyAHBC_Hack23/tree/main/mindgrowinggardens-contracts).


[Axelar](https://axelar.network/) provides the technology that connects the NFT on different blockchains via `callContract`. The Proof of Concept is succeed by deploying and test on local!
- Contract: https://github.com/luckiestkitty/EasyAHBC_Hack23/blob/main/axelar-interPalaces/examples/evm/interPalaces-nft/InterPalacesNFT.sol 

## Future works

- Deploy and test the NFT with axelar interchain capability powered by Axelar on testnet.
- Generate NFTs to support more digital format (music, texts, and etc).
- Enable the conversational agent features to prove powerful cognitive tools.
- UI/UX designs.
