/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useReadContract } from "wagmi";
import ShipmentCard from "./ShipmentCard";
import {
  SUPPLY_CHAIN_ABI,
  SUPPLY_CHAIN_ADDRESS,
} from "../config/contract";
import type { AllShipmentsReturn } from "../../types/shipments";

export default function ShipmentList() {
  const { data, isLoading, error, status } = useReadContract({
    address: SUPPLY_CHAIN_ADDRESS,
    abi: SUPPLY_CHAIN_ABI,
    functionName: "getAllShipments",
    query: { refetchInterval: 2000 },
  });

  if (isLoading) return <p>Loading...</p>;
  
    console.log("READ STATUS:", status);
    console.log("READ ERROR:", error);
    console.log("READ DATA:", data);

  return (
    <div className="space-y-3">
      {(data as AllShipmentsReturn | undefined)?.map(
        (shipment: { id: { toString: () => any; }; }) => (
          <ShipmentCard
            key={shipment.id.toString()}
            shipment={shipment}
          />
        )
      )}
    </div>
  );
}
