// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "wormhole-solidity-sdk/src/interfaces/IWormholeRelayer.sol";
import "wormhole-solidity-sdk/src/interfaces/IWormholeReceiver.sol";

contract MessageReceiver is Ownable, IWormholeReceiver {
    IWormholeRelayer public wormholeRelayer;

    event MessageReceived(string message);

    constructor(address _wormholeRelayer) Ownable() {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory, // additional VAAs (optional, not needed here)
        bytes32, // sender address
        uint16 sourceChain,
        bytes32 // delivery hash
    ) public payable override {
        require(msg.sender == address(wormholeRelayer), "Only the Wormhole relayer can call this function");

        // Decode the payload to extract the message and other details
        (string memory message) = abi.decode(payload, (string));

        // Emit an event with the received message
        emit MessageReceived(message);
    }
}

