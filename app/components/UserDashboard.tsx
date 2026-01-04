/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConnections, useReadContract } from "wagmi";
import ShipmentCard from "./ShipmentCard";
import {
  SUPPLY_CHAIN_ABI,
  SUPPLY_CHAIN_ADDRESS,
} from "../config/contract";
import type {
  AllShipmentsReturn,
  UserShipmentIdsReturn,
} from "../../types/shipments"

export default function UserDashboard() {
  const connections = useConnections();
  const address = connections[0]?.accounts?.[0];
  const isConnected = !!address;

  const { data: ids } = useReadContract({
    address: SUPPLY_CHAIN_ADDRESS,
    abi: SUPPLY_CHAIN_ABI,
    functionName: "getUserShipments",
    args: address ? [address] : undefined,
    query: { enabled: isConnected },
  });

  const { data: all } = useReadContract({
    address: SUPPLY_CHAIN_ADDRESS,
    abi: SUPPLY_CHAIN_ABI,
    functionName: "getAllShipments",
    query: { enabled: isConnected },
  });

  const myShipments =
    (all as AllShipmentsReturn | undefined)?.filter(
      (s: { id: any; }) =>
        (ids as UserShipmentIdsReturn | undefined)?.includes(
          s.id
        )
    ) ?? [];

  if (!isConnected) {
    return <p>Connect your wallet</p>;
  }

  return (
    <div className="space-y-3">
      <h2 className="font-semibold">My Shipments</h2>

      {myShipments.map((shipment: { id: { toString: () => any; }; }) => (
        <ShipmentCard
          key={shipment.id.toString()}
          shipment={shipment}
        />
      ))}
    </div>
  );
}
