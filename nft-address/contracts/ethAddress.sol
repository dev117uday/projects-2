// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract ethAddress {

    mapping(string => address) internal _dictionary;


    function addAddress(string memory key, address ownAddress) public returns(bool) {
        if(_dictionary[key] != address(0x0) ) {
            return false;
        }
        _dictionary[key] = ownAddress;
        return true;
    }

    function getAddressDictContract(string memory key) public view returns(address) {
        return _dictionary[key];
    }
  
}