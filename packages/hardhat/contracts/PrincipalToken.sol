pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract PrincipalToken is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser("Principal Token", "PRC") {
        _mint(msg.sender, 10000000000000*10**18);
    }

    function mint(uint256 amount) external {
      _mint(msg.sender, amount);
    }
}