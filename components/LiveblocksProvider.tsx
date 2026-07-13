'use client'
import { error } from 'console';
import React, { ReactNode, Suspense } from 'react'
import { LiveblocksProvider } from "@liveblocks/react/suspense";

const LiveBlocksProvider = ({ childern }: { childern: React.ReactNode }) => {
    if (!process.env.NEXT_PUBLIC_LIVE_BLOCKS_KEY) { 
        throw new Error("Public key not found")
    }
    return <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}> {childern}</LiveblocksProvider>; 
}

export default LiveBlocksProvider