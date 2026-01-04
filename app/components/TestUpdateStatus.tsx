"use client"

import { useWriteContract } from "wagmi"
import { SUPPLY_CHAIN_ABI, SUPPLY_CHAIN_ADDRESS } from "../config/contract"

export default function TestUpdateStatus() {
    const { writeContract, isPending, error } = useWriteContract();
    
    function handleClick() {
        writeContract({
            address: SUPPLY_CHAIN_ADDRESS, 
            abi: SUPPLY_CHAIN_ABI,
            functionName: "updateStatus",
            args: [1n, 1]
        })
    }

    return (
        <div className="border p-4 space-y-2">
            <button
                onClick={handleClick}
                disabled={isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {isPending ? "Updating..." : "Update Status"}
            </button>

            {error && (
                <p className="text-red-600">
                    {error.message}
                </p>
            )}
        </div>
    )
}