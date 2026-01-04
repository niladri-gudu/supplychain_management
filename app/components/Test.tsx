"use client"

import { useEffect } from "react"
import { usePublicClient } from "wagmi"
import { SUPPLY_CHAIN_ADDRESS } from "../config/contract"

export default function BytecodeCheck() {
  const client = usePublicClient()

  useEffect(() => {
    client
      .getBytecode({ address: SUPPLY_CHAIN_ADDRESS })
      .then((code) => {
        console.log("BYTECODE:", code)
      })
  }, [client])

  return null
}
