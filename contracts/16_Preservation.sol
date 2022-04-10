//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Preservation {
    function owner() external view returns (address);
    function setFirstTime(uint _timeStamp) external;
    function setSecondTime(uint _timeStamp) external;
}

contract InjectorLibrary {
    address public timeZone1Library;
    address public timeZone2Library;
    uint public owner;

    function setTime(uint _owner) public {
        owner = _owner;
    }
}
