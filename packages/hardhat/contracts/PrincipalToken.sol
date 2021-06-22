pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract ERC20FixedSupply is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser("Principal Token", "PRC") {
        _mint(msg.sender, 100000000);
    }
}