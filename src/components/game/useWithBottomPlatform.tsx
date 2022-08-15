import React, { useMemo } from "react"
import {useEffect, useRef, useState} from "react"

export interface UseWithBottomPlatform{
  BottomPlatform: () => JSX.Element,
  bottomPlatformRef: React.RefObject<HTMLDivElement>,
}

export const useWithBottomPlatform = (): UseWithBottomPlatform => {
    const bottomPlatformRef = useRef<HTMLDivElement>(null)

    // TODO: These components should be memoized so they always return the same component unless some specific thing changes
    const BottomPlatform = (): JSX.Element =>{
      return (
        <div
        ref={bottomPlatformRef}
        style={{
            width:"100vw",
            height: "5vh",
            backgroundColor:"green",
            position:"absolute",
            bottom: 0
        }} />
      )
    }

    return{
      BottomPlatform,
      bottomPlatformRef,
    }
}
