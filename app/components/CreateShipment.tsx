"use client"

import { useState } from "react"
import { parseEther } from "viem"
import { useWriteContract } from "wagmi"
import { SUPPLY_CHAIN_ABI, SUPPLY_CHAIN_ADDRESS } from "../config/contract"

export default function CreateShipment() {
    const [seller, setSeller] = useState("")
    const [amount, setAmount] = useState("0.01")

    const { writeContract, isPending } = useWriteContract()

    function handleCreate() {
        writeContract({
            address: SUPPLY_CHAIN_ADDRESS,
            abi: SUPPLY_CHAIN_ABI,
            functionName: "createShipment",
            args: [seller],
            value: parseEther(amount),
        })
    }

    return (
        <div className="flex flex-col border p-4 rounded-2xl gap-4 w-1/3">
            <h2 className="text-center text-2xl">Create Shipment</h2>

            <input
                placeholder="seller address"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                className="border p-2 rounded-xl w-full"
            />

            <input
                placeholder="ETH amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded-xl w-full"
            />

            <button
                onClick={handleCreate}
                disabled={isPending}
                className="border p-2 rounded-xl cursor-pointer w-full"
            >
                {isPending ? "Creating..." : "Create"}
            </button>

        </div>
    )
}