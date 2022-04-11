//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface MagicNum {
  function setSolver(address _solver) external;
}

// Just a starting point, not used in answer
contract Solver {
    function whatIsTheMeaningOfLife() pure external returns (uint r) {
        return 42;
    }
}
