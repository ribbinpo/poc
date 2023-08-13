import { Inter } from "next/font/google";
import { ethers } from "ethers";
import CounterAbi from "@/contracts/counter.json";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [chainName, setChainName] = useState("goerli");
  const [targetDst, setTargetDst] = useState(
    "0xEC90f612c5950631e5deBd190B40b4BAd1cB1173"
  );
  const [result, setResult] = useState("");

  async function createCall() {
    const abiEncoder = new ethers.utils.Interface(CounterAbi);

    const callData = abiEncoder.encodeFunctionData("increment");
    const axecutor = "0x833eE32D90Bb9c26E75311231c1484Bc31aF79Bb";
    const obj = {
      chain: chainName,
      target: targetDst,
      callData: callData,
      subCalls: [],
      axecutor: axecutor,
      fee: 0,
    };
    // const a = new Call(chainName, targetDst, callData, axecutor, "0");

    const res = new ethers.utils.AbiCoder().encode(
      [
        "tuple(string chain, address target, bytes callData, bytes[] subCalls, address axecutor, uint fee)",
      ],
      [obj]
    );
    console.log(res);
    setResult(res);
    // console.log(new Call(chainName, target, callData, axecutor, fee));
    // return new Call(chainName, target, callData, axecutor, fee);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center space-y-6 p-24 ${inter.className}`}
    >
      <div className="flex flex-col space-y-3">
        <div>Chain Name</div>
        <input
          type="text"
          className="p-2"
          value={chainName}
          onChange={(e) => setChainName(e.target.value)}
        />
        <div>Target Destination Contract</div>
        <input
          type="text"
          className="p-2"
          value={targetDst}
          onChange={(e) => setTargetDst(e.target.value)}
        />
        <button onClick={createCall} className="bg-green-500 rounded-full">
          getTransferFee
        </button>
      </div>
      {result && (
        <textarea className="border border-blue-500 rounded-md p-2">
          {result}
        </textarea>
      )}
    </main>
  );
}
