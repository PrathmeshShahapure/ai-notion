'use client'

import { useMyPresence, useOthers } from "@liveblocks/react/suspense"

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();
 
    const handleMove = (e: PointerEvent<HTMLDivElement>) => { 
        
        const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) }
        updateMyPresence({ cursor });

    }
    const handleLeave = () => { 
        updateMyPresence({ cursor:null })
    }

    return (
        <div onPointerMove={handleMove} onPointerLeave={handleLeave}>
            {others.filter((others) => others.presence.cursor !== null).map((({ connectionId,presence,info}) => (
                <FollowPointer key={connectionId} infor={info} x={presence.cursor!.x} y={ presence.cursor!.y} />
            )))}
            {children}
        </div>
  )
}

export default LiveCursorProvider