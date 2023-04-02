// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IERC20 } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract InterPalacesNFT is AxelarExecutable, ERC721, Ownable {
    string public value;
    string public remoteChain;
    string public remoteAddress;
    string public sourceChain;
    string public sourceAddress;
    IAxelarGasService public immutable gasService;

    mapping(uint256 => string) private _tokenURIs;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(address gateway_, address gasReceiver_) AxelarExecutable(gateway_) ERC721('TestNFT', 'TN') {
        gasService = IAxelarGasService(gasReceiver_);
    }

    function safeMint(address to, string memory _tokenURI, uint256 _tokenId) public {
        // uint256 tokenId = _tokenIdCounter.current();
        _tokenURIs[_tokenId] = _tokenURI;
        // _tokenIdCounter.increment();
        
        _safeMint(to, _tokenId);
    }

    function teleportPalace(uint256 _tokenId, string calldata _newTokenURI) external payable {
        require(msg.sender == ownerOf(_tokenId), 'NOT OWNER');
        require(_exists(_tokenId), 'ERC721Metadata: URI query for nonexistent token');
        delete _tokenURIs[_tokenId];
        _burn(_tokenId);

        if (bytes(remoteChain).length <= 0 || bytes(remoteAddress).length <= 0) {
            // This NFT isn't connected, so it won't be transferred
            return;
        }
        bytes memory payload = abi.encode(3, msg.sender, _newTokenURI, _tokenId);
        send(payload);
    }

    // Call this function to update the value of this contract along with all its siblings'.
    function setRemoteValue(string calldata destinationChain, string calldata destinationAddress, string calldata value_) external payable {
        bytes memory payload = abi.encode(value_);
        if (msg.value > 0) {
            gasService.payNativeGasForContractCall{ value: msg.value }(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    // Handles calls created by setAndSend. Updates this contract's value
    function _execute(string calldata sourceChain_, string calldata sourceAddress_, bytes calldata payload_) internal override {
        uint method;
        (method) = abi.decode(payload_, (uint8));
        // Connect
        // Connect
        if (method == 1) {
            remoteChain = sourceChain_;
            remoteAddress = sourceAddress_;

            // Update
        } else if (method == 2) {
            string memory newURI;
            uint tokenId;

            (, newURI, tokenId) = abi.decode(payload_, (uint8, string, uint));
            _tokenURIs[tokenId] = newURI;
        } else if (method == 3) {
            string memory newURI;
            uint tokenId;
            address mintAddress;

            (, mintAddress, newURI, tokenId) = abi.decode(payload_, (uint8, address, string, uint));

            safeMint(mintAddress, newURI, tokenId);
        }
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
        return _tokenURIs[tokenId];
    }

    function send(bytes memory payload) internal {
        if (msg.value > 0) {
            gasService.payNativeGasForContractCall{ value: msg.value }(address(this), remoteChain, remoteAddress, payload, msg.sender);
        }
        gateway.callContract(remoteChain, remoteAddress, payload);
    }

    function connectNFTs(string calldata destinationChain, string calldata destinationAddress) external payable {
        remoteChain = destinationChain;
        remoteAddress = destinationAddress;
        bytes memory payload = abi.encode(1);
        send(payload);
    }

    function update(string calldata newURI, uint token) external payable {
        _tokenURIs[token] = newURI;
        if (bytes(remoteChain).length <= 0 || bytes(remoteAddress).length <= 0) {
            // This NFT isn't connected, so it won't be transferred
            return;
        }
        bytes memory payload = abi.encode(2, newURI, token);
        send(payload);
    }
}
