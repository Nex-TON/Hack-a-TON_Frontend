import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, toNano } from "ton-core";
import { NexTon } from "./tact_NexTon";
import useTonConnect from "./useTonConnect";

function useNextonContract() {
  const contractAddress = "EQCY_ODi6mZJC1m7RNr6QoweWvumtebT-G21Yn_V2U7x5i2c";
  const client = useTonClient();
  const { sender, address } = useTonConnect();

  let nextonContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NexTon(Address.parse(contractAddress));

    return client.open(contract);
  }, [client]);

  return {
    address: nextonContract?.address.toString(),
    sendMessage: async (data) => {
      if (nextonContract) {
        return await nextonContract.send(
          sender,
          { value: toNano("0.23") },
          data
        );
      } else {
        return () => {};
      }
    },
    sendValue: async (value) => {
      if (nextonContract) {
        return await sender.send({
          to: contractAddress,
          value: toNano(value),
        });
      } else {
        return () => {};
      }
    },
  };
}

export { useNextonContract };