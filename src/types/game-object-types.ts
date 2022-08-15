interface XY{
    x: number,
    y: number
  }

// Relative to top left of screen
export interface Coordinates{
    topLeft: XY,
    topRight: XY,
    bottomLeft: XY,
    bottomRight: XY
}