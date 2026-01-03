import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { hardhat, sepolia } from "wagmi/chains"

export const wagmiConfig = getDefaultConfig({
    appName: "SupplyChain Escrow DApp",
    projectId: "1aa90ba3fe34e73a9e6a654b39f88e63",
    chains: [sepolia, hardhat],
    ssr: true
})