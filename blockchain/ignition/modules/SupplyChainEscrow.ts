import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("SupplyChainEscrowModule", (m) => {
    const supplyChainEscrow = m.contract("SupplyChainEscrow");

    return { supplyChainEscrow }
})