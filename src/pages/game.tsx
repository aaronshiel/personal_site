import React, { useEffect, useState } from "react"
import {useRef} from 'react'
import { useWithBottomPlatform } from "../components/game/useWithBottomPlatform"
import ScoreCounter from "../components/game/scoreCounter"
import { areCoordinatesColliding, getCoordinates } from "../helpers"
import '../styles/game_page_styling.css'
import { useWithPlayer } from "../components/game/useWithPlayer"
import { useInterval } from "usehooks-ts"



/**
 * GAME:
 * 
 * Layout:
 * Camera is going to be static
 * Bottom platform remains static.
 * Other platforms can move, but probably don't move off screen too much
 * At game start, platforms will be placed and 
 * If the size of the screen shifts for any reason, the game will "reload" with 
 * 
 * Game Design:
 * Player will be a smol pony that can jump around and pick up muffins
 * Muffin scoreboard
 */


const GamePage = () => {
    const {BottomPlatform, bottomPlatformRef} = useWithBottomPlatform();
    const {PlayerComponent, playerRef, moveXPosition: movePlayerX, moveYPosition: movePlayerY} = useWithPlayer()
    const [keyState, setKeyState] = useState<Record<string, boolean>>({})

    function update(){
        if(!playerRef.current || !bottomPlatformRef.current){
            return
        }
        const playerCoordinates = getCoordinates(playerRef.current.getBoundingClientRect())
        const bottomPlatformCoordinates = getCoordinates(bottomPlatformRef.current.getBoundingClientRect())
        if(!areCoordinatesColliding(playerCoordinates, bottomPlatformCoordinates)){
            movePlayerY(8, playerCoordinates, bottomPlatformCoordinates)
        }
        if(keyState["d"]){
            movePlayerX(17, playerCoordinates, bottomPlatformCoordinates)
        }
        if(keyState["a"]){
            movePlayerX(-17, playerCoordinates, bottomPlatformCoordinates)
        }
        if(keyState[" "]){
            movePlayerY(-20, playerCoordinates, bottomPlatformCoordinates)
        }
    }

    useInterval(
        update,
        33 //how often update is called
    )

    useEffect(()=>{
        window.addEventListener('keyup', (e) => setKeyState(prevValue => {prevValue[e.key] = false; return prevValue}));
        window.addEventListener('keydown', (e) => setKeyState(prevValue => {prevValue[e.key] = true; return prevValue}));
    }, [])

    return (
        <div>
            <ScoreCounter />

            {/* Player Holder */}
            {/* TODOs */}
            {/* Make the character start at position above bottom block, and use arrow keys to move left + right */}
            {/* Give player gravity, stopping descent when they reach the top of the bottom platform */}
            <PlayerComponent />
            <BottomPlatform />
        </div>
    )
}

export default GamePage
