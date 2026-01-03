import { useReadContract } from "wagmi";
import { SUPPLY_CHAIN_ABI, SUPPLY_CHAIN_ADDRESS } from "../config/contract";

export function useAllShipments() {
    return useReadContract({
        address: SUPPLY_CHAIN_ADDRESS,
        abi: SUPPLY_CHAIN_ABI,
        functionName: "getAllShipments"
    })
}