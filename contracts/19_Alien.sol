//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Ownable {
    function owner() pure external returns (address);
    function renounceOwnership() external;
    function transferOwnership(address _newOwner) external;
}

interface AlienCodex is Ownable {
    function contact() pure external returns (bool);
    function codex(uint i) pure external returns (bytes32);
    function make_contact() external;
    function record(bytes32 _content) external;
    function retract() external;
    function revise(uint i, bytes32 _content) external;
}
