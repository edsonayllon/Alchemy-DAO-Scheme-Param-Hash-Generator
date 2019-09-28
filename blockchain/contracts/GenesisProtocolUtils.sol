pragma solidity ^0.5.4;

contract GenesisProtocolUtil {
    function getParametersHash(
        uint[11] memory _params,//use array here due to stack too deep issue.
        address _voteOnBehalf
    ) public pure returns(bytes32) {
        //double call to keccak256 to avoid deep stack issue when call with too many params.
        return keccak256(
            abi.encodePacked(
            keccak256(
            abi.encodePacked(
                _params[0],
                _params[1],
                _params[2],
                _params[3],
                _params[4],
                _params[5],
                _params[6],
                _params[7],
                _params[8],
                _params[9],
                _params[10])
            ),
            _voteOnBehalf
        ));
    }
}

