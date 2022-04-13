//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Donor {
    function give(address payable _addr) external payable {
        selfdestruct(_addr);
    }
}
