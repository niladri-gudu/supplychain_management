"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";

import CreateShipment from "./components/CreateShipment";
import UserDashboard from "./components/UserDashboard"
import ShipmentList from "./components/ShipmentList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        Supply Chain Escrow App
      </h1>
      <ConnectButton />

      <CreateShipment />
      <UserDashboard />
      <ShipmentList />

    </main>
  );
}
