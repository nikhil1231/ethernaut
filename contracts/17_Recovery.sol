//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Recovery {
    function generateToken(string memory _name, uint256 _initialSupply) external;
}

interface SimpleToken {
    function destroy(address payable _to) external;
}
