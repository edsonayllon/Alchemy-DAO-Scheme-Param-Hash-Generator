import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import { GenesisProtocolUtilAbi } from './abi.js';
import './App.css';

const web3 = new Web3(Web3.givenProvider);
var BN = web3.utils.BN;

function App() {
  const [paramHash, setParamHash] = useState('');

  const callUtils = async () => {
    const contractAddr = '0x96a1133b063C2A4a44Ab0c617853E9b3b51c7Bc0';
    const UtilsContract = new web3.eth.Contract(GenesisProtocolUtilAbi, contractAddr);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    // Refer https://daostack.zendesk.com/hc/en-us/sections/360000535638-Genesis-Protocol
    // current parameters based on https://daotalk.org/t/the-contentious-genesis-parameter-delta/481
    // edit these, running this app should produce the param has in the console
    const voteParams = {
      "boostedVotePeriodLimit": 345600, // voting period, boosted votes are fast tracked
      "daoBountyConst": 10, // determines automatic downstaking value by multiplying by average
      "minimumDaoBountyGWei": 150000000000, // minimum amount of GEN a DAO will stake when automatically downstaking each proposal
      "queuedVotePeriodLimit": 2592000, // voting time for nonboosted proposals
      "queuedVoteRequiredPercentage": 50, // quorum to decide votes (nonboosted)
      "preBoostedVotePeriodLimit": 86400, // time proposal must be above boosted threshold before being boosted
      "proposingRepRewardGwei": 50000000000, // controls how much voting power someone who submits a proposal gains
      "quietEndingPeriod": 172800, // time votes need to stay the same to be considered the final result
      "thresholdConst": 1200, // controls rate of required confidence score for boosting rising as currently boosted proposals rises.
      "voteOnBehalf": "0x0000000000000000000000000000000000000000", // https://daotalk.org/t/how-to-use-the-scheme-registrar-in-alchemy/669 kept this as null address
      "votersReputationLossRatio": 4, // percentage lost if vote is against the final outcome for nonboosted
      "activationTime": 0 // time when proposing and voting is activated (unix)
    }

    let input = [
      [
        voteParams.queuedVoteRequiredPercentage,
        voteParams.queuedVotePeriodLimit,
        voteParams.boostedVotePeriodLimit,
        voteParams.preBoostedVotePeriodLimit,
        voteParams.thresholdConst,
        voteParams.quietEndingPeriod,
        voteParams.proposingRepRewardGwei,
        voteParams.votersReputationLossRatio,
        voteParams.minimumDaoBountyGWei,
        voteParams.daoBountyConst,
        voteParams.activationTime
      ],
      voteParams.voteOnBehalf
    ]

    const gas = await UtilsContract.methods.getParametersHash(
      input[0], 
      input[1]
    ).estimateGas();

    const result = await UtilsContract.methods.getParametersHash(
      input[0], 
      input[1]
    ).call({ from: account, gas }, (err, result) => {
      console.log(err);
      console.log(result);
    });
    setParamHash(result)
  } 

  useEffect(()=>{
    callUtils();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Param Hash: {paramHash}
        </p>
        <p>
          Edit Parameters in App.js
        </p>
      </header>
    </div>
  );
}

export default App;
