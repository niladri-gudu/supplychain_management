import type { ReadContractReturnType } from "wagmi";
import { SUPPLY_CHAIN_ABI } from "../config/contract";

// getAllShipments()
export type AllShipmentsReturn =
  ReadContractReturnType<
    typeof SUPPLY_CHAIN_ABI,
    "getAllShipments"
  >;

// getUserShipments(address)
export type UserShipmentIdsReturn =
  ReadContractReturnType<
    typeof SUPPLY_CHAIN_ABI,
    "getUserShipments"
  >;
