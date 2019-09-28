const GenesisProtocolUtilAbi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_params",
                "type": "uint256[11]"
            },
            {
                "name": "_voteOnBehalf",
                "type": "address"
            }
        ],
        "name": "getParametersHash",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }
]

export {
    GenesisProtocolUtilAbi
}