import { Coordinates } from "./types/game-object-types";

export function getCoordinates(domRect: DOMRect): Coordinates{
    const topLeftX = domRect.left
    const topLeftY = domRect.top

    const topRightX = domRect.left + domRect.width
    const topRightY = domRect.top
    
    const botLeftX = domRect.left
    const botLeftY = domRect.top + domRect.height

    const botRightX = domRect.left + domRect.width
    const botRightY = domRect.top + domRect.height

    console.log(domRect.top)
    
    return {topLeft: {x: topLeftX, y: topLeftY}, topRight: {x:topRightX, y: topRightY}, bottomLeft: {x:botLeftX, y:botLeftY}, bottomRight: {x:botRightX, y:botRightY}}
  }

export function areCoordinatesColliding(coord1: Coordinates, coord2: Coordinates): boolean{
    const xPositionOverlaps = (coord1.bottomRight.x >= coord2.bottomLeft.x) && (coord1.bottomLeft.x <= coord2.bottomRight.x)
    const yPositionOverlaps = (coord1.topRight.y <= coord2.bottomLeft.y) && (coord1.bottomRight.y >= coord2.topLeft.y)
    return xPositionOverlaps && yPositionOverlaps
}

