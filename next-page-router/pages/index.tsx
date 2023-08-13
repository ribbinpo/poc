import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  AxelarAssetTransfer,
  AxelarQueryAPI,
  AxelarGMPRecoveryAPI,
  CHAINS,
  Environment,
  GMPStatusResponse,
} from "@axelar-network/axelarjs-sdk";

const inter = Inter({ subsets: ["latin"] });

const axelarQuery = new AxelarQueryAPI({
  environment: Environment.TESTNET,
});

const axelarRecovery = new AxelarGMPRecoveryAPI({
  environment: Environment.TESTNET,
});

// TODO: Axelar Scan Testnet
// https://testnet.axelarscan.io/gmp/search
export default function Home() {
  // TODO: Token Transfer via Deposit Address
  const getFee = async () => {
    const fee = await axelarQuery.getTransferFee(
      CHAINS.TESTNET.OSMOSIS,
      CHAINS.TESTNET.AVALANCHE,
      "uausdc",
      1000000
    );
    console.log(fee);
  };

  // FIXME: CORS
  const getDepositAddress = async () => {
    const axelarAssetTransfer = new AxelarAssetTransfer({
      environment: Environment.TESTNET,
    });
    const fromChain = CHAINS.TESTNET.OSMOSIS,
      toChain = CHAINS.TESTNET.AVALANCHE,
      destinationAddress = "0xE3876f1D0D0DbC782d7844FdE8675c75628E36a2",
      asset = "uausdc";
    const depositAddress = await axelarAssetTransfer.getDepositAddress({
      fromChain,
      toChain,
      destinationAddress,
      asset,
    });
    console.log(depositAddress);
  };

  // TODO: GMP Transaction status and recovery
  const queryTransactionStatus = async () => {
    // Success
    // 0x0f8abd900a76784574eee06410c06cd4e819b24be0bbbadeeb5e31447d6f65e9
    // Failed
    // 0x4d3874bbca0dbfceb7690c9efd0d9bebe3d38dcf09b71ab8e97733c6ca879aed
    const txHash: string =
      "0xb1d77f9f91b026b9f32d41a94d69dde8731e75f2d3132902c81ec7b369a0318c";
    const txStatus: GMPStatusResponse =
      await axelarRecovery.queryTransactionStatus(txHash);
    console.log(txStatus);
  };

  // TODO: check status and recovery
  // https://docs.axelar.dev/dev/axelarjs-sdk/tx-status-query-recovery
  const queryTransactionStatusAndRecovery = async () => {
    // const sourceTxHash = "0x..";
    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://goerli.infura.io/v3/projectId"
    // );

    // const senderOptions = { privateKey: "0x", provider };

    // const response = await sdk.manualRelayToDestChain(
    //   sourceTxHash,
    //   senderOptions /* can be skipped */
    // );
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col space-y-3">
        <ConnectButton />
        <button onClick={getFee}>getTransferFee</button>
        <button onClick={getDepositAddress}>getDepositAddress</button>
        <button onClick={queryTransactionStatus}>queryTransactionStatus</button>
        <button onClick={queryTransactionStatusAndRecovery}>queryTransactionStatusAndRecovery</button>
      </div>
    </main>
  );
}
