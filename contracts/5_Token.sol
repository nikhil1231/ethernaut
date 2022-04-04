//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Token {
    function totalSupply() external pure returns (uint);
    function transfer(address _to, uint _value) external returns (bool);
    function balanceOf(address _owner) external view returns (uint balance);
}
