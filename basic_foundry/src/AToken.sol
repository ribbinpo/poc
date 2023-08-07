// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin/token/ERC20/ERC20.sol";

contract AToken is ERC20 {
  constructor() ERC20("AToken", "ATK") {
    _mint(msg.sender, 100 * 10 ** decimals());
  }

  function mint(uint256 _amount) external {
    _mint(msg.sender, _amount * 10 ** decimals());
  }

  function burn(uint256 _amount) external {
    _burn(msg.sender, _amount * 10 ** decimals());
  }
}
