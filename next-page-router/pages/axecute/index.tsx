import { Inter } from "next/font/google";
import { Call } from "@axecute-official/axecute-sdk";
import { ethers } from "ethers";
import CounterAbi from "@/contracts/counter.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function createCall() {
    console.log(1);
    const chainName = "goerli";
    const target = "0xEC90f612c5950631e5deBd190B40b4BAd1cB1173";

    const abiEncoder = new ethers.utils.Interface(CounterAbi);
    
    const callData = abiEncoder.encodeFunctionData("increment");
    const axecutor = "0x833eE32D90Bb9c26E75311231c1484Bc31aF79Bb";
    const obj = {
      chain: chainName,
      target: target,
      callData: callData,
      subCalls: [],
      axecutor: axecutor,
      fee: 0
  };
  console.log(callData);
    console.log(
      new ethers.utils.AbiCoder().encode(
        ["tuple(string chain, address target, bytes callData, bytes[] subCalls, address axecutor, uint fee)"],[obj]
      )
    );
    // console.log(new Call(chainName, target, callData, axecutor, fee));
    // return new Call(chainName, target, callData, axecutor, fee);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col space-y-3">
        <button onClick={createCall}>getTransferFee</button>
      </div>
    </main>
  );
}
