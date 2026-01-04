/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useWriteContract } from "wagmi";
import { SUPPLY_CHAIN_ABI, SUPPLY_CHAIN_ADDRESS } from "../config/contract"

const STATUS_LABELS = ["Pending", "In Transit", "Delivered"]

export default function ShipmentCard({ shipment }: any) {
    const { writeContract, isPending } = useWriteContract()

    function advanceStatus() {
        writeContract({
            address: SUPPLY_CHAIN_ADDRESS,
            abi: SUPPLY_CHAIN_ABI,
            functionName: "updateStatus",
            args: [shipment.id, shipment.status + 1]
        })
    }

    return (
        <div className="border p-3 rounded space-y-1">
            <p>ID: {shipment.id.toString()}</p>
            <p>Status: {STATUS_LABELS[shipment.status]}</p>
            <p>Buyer: {shipment.buyer}</p>
            <p>Seller: {shipment.seller}</p>

            {shipment.status < 2 && (
                <button
                    onClick={advanceStatus}
                    disabled={isPending}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                    {isPending ? "Updating..." : "Advance Status"}
                </button>
            )}
        </div>
    )
}