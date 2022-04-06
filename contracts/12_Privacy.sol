//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Privacy {
    function locked() external view returns (bool);
    function unlock(bytes16 _key) external;
}
