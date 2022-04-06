//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


// interface GatekeeperTwo {
//     function entrant() external view returns (address);
//     function enter(bytes8 _gateKey) external returns (bool);
// }

contract GateCrasherTwo {

    constructor(address _gate) {
        unchecked {
            bytes8 key = bytes8(keccak256(abi.encodePacked(address(this))) ^ bytes8(uint64(0) - 1));
            GatekeeperTwo(_gate).enter(key);
        }
    }
}

contract GatekeeperTwo {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin, "Failed first");
    _;
  }

  modifier gateTwo() {
    uint x;
    assembly { x := extcodesize(caller()) }
    require(x == 0, "Failed second");
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    unchecked {
        require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1, "Failed third");
    }
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}