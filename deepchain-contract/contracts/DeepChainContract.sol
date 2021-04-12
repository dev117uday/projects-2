//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

contract DeepChainContract {


    receive() external payable {}

    function() external payable {

    }

    function balanceOf() external view returns (uint256){
        return address(this).balance;
    }
}