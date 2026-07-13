import React, { ReactNode } from 'react'
import LiveBlocksProvider from "@/components/LiveblocksProvider";
const Pagelayout = ({ childern }: {childern:React.ReactNode}) => {
  return (
      <LiveBlocksProvider>{ childern}</LiveBlocksProvider>
  )
}

export default Pagelayout