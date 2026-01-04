import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { hardhat, sepolia } from "wagmi/chains"

export const wagmiConfig = getDefaultConfig({
    appName: "SupplyChain Escrow DApp",
    projectId: process.env.NEXT_PUBLIC_PROJECTID as string,
    chains: [hardhat],
    ssr: true
})