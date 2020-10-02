export const MiningPatternType = {
  Spiral: "Spiral",
};

export class SpiralPattern {
  type = MiningPatternType.Spiral;
  fromChunk = null;
  chunkSideLength = null;

  constructor(center, chunkSize) {
    const bottomLeftX = Math.floor(center.x / chunkSize) * chunkSize;
    const bottomLeftY = Math.floor(center.y / chunkSize) * chunkSize;
    const bottomLeft = { x: bottomLeftX, y: bottomLeftY };
    this.fromChunk = {
      bottomLeft,
      sideLength: chunkSize,
    };
    this.chunkSideLength = chunkSize;
  }

  nextChunk(chunk) {
    const homeX = this.fromChunk.bottomLeft.x;
    const homeY = this.fromChunk.bottomLeft.y;
    const currX = chunk.bottomLeft.x;
    const currY = chunk.bottomLeft.y;

    const nextBottomLeft = { x: currX, y: currY };

    if (currX === homeX && currY === homeY) {
      nextBottomLeft.y = homeY + this.chunkSideLength;
    } else if (
      currY - currX > homeY - homeX &&
      currY + currX >= homeX + homeY
    ) {
      if (currY + currX === homeX + homeY) {
        // break the circle
        nextBottomLeft.y = currY + this.chunkSideLength;
      } else {
        nextBottomLeft.x = currX + this.chunkSideLength;
      }
    } else if (
      currX + currY > homeX + homeY &&
      currY - currX <= homeY - homeX
    ) {
      nextBottomLeft.y = currY - this.chunkSideLength;
    } else if (
      currX + currY <= homeX + homeY &&
      currY - currX < homeY - homeX
    ) {
      nextBottomLeft.x = currX - this.chunkSideLength;
    } else {
      // if (currX + currY < homeX + homeY && currY - currX >= homeY - homeX)
      nextBottomLeft.y = currY + this.chunkSideLength;
    }

    return {
      bottomLeft: nextBottomLeft,
      sideLength: this.chunkSideLength,
    };
  }
}
