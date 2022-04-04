//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Delegation {
    function owner() external pure returns (address);
    function pwn() external;
}
