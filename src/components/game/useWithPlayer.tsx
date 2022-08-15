import React, { useEffect, useRef, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { getCoordinates } from '../../helpers'
import { Coordinates } from "../../types/game-object-types"

export interface UseWithPlayer{
    PlayerComponent: () => JSX.Element,
    playerRef: React.RefObject<HTMLDivElement>,
    moveYPosition: (amount: number, playerCoordinates: Coordinates, bottomPlatformCoordinates: Coordinates) => void;
    moveXPosition: (amount: number, playerCoordinates: Coordinates, bottomPlatformCoordinates: Coordinates) => void;
  }

export const useWithPlayer = (): UseWithPlayer => {
    const playerRef = useRef<HTMLDivElement>(null)
    const playerDomRect = playerRef.current?.getBoundingClientRect()
    const [yPosition, setYPosition] = useState<number>(850) //pixels from the top
    const [xPosition, setXPosition] = useState<number>(50) //pixels from the left
    const playerWidth = 20 //pixels
    const playerHeight = 20 //pixels

    useEffect(()=>{
        if(!playerDomRect){
            console.log("no rect found")
            return
        }
        console.log("should be setting coords")
    },[playerDomRect?.top])

    console.log(playerDomRect?.top)

    const PlayerComponent = () =>{
        return(
            <div 
            ref={playerRef}
            style={{
                position:"absolute",
                width:`${playerWidth}px`,
                height:`${playerHeight}px`,
                top: `${yPosition}px`,
                left: `${xPosition}px`,
                backgroundColor:"black"
            }} />
        )
    }
    function moveYPosition(amount: number, playerCoordinates: Coordinates, bottomPlatformCoordinates: Coordinates){
        setYPosition(prevValue => {
            if((prevValue + playerHeight + amount) > bottomPlatformCoordinates.topLeft.y - 1){
                return bottomPlatformCoordinates.topLeft.y - playerHeight - 1
            }
            return prevValue += amount
        })
    }

    function moveXPosition(amount: number, playerCoordinates: Coordinates, bottomPlatformCoordinates: Coordinates){
        setXPosition(prevValue => {
            if(prevValue + amount < 0){
                return 1
            }
            if((prevValue + amount + playerWidth) > (window.innerWidth - 1)){
                return window.innerWidth - playerWidth - 1
            }
            return prevValue += amount
        })
    }

    return{
        PlayerComponent,
        playerRef,
        moveYPosition,
        moveXPosition
    }
}