import React, { useCallback } from 'react'
import p5 from 'p5'
import Sketch from '../../components/Sketch'

const WIDTH = 1000
const HEIGHT = 760

const FlowField = () => {
  const sketch = useCallback((p: p5) => {
    const scale = 10

    const rows = p.floor(HEIGHT / scale)
    const cols = p.floor(WIDTH / scale)

    const increment = 0.05

    let tOffset = 0
    let yStartOffset = 0
    let xStartOffset = 0

    const drawFlowField = () => {
      let yOffset = yStartOffset
      for (let y = 0; y < rows; y += 1) {
        let xOffset = xStartOffset
        p.stroke(50, p.map(y, 0, rows, 200, 10))
        for (let x = 0; x < cols; x += 1) {
          xOffset += increment
          const noise = p.noise(xOffset, yOffset, tOffset)
          const angle = p.map(noise, 0, 1, 0, p.TWO_PI * 2)

          const vector = p5.Vector.fromAngle(angle)
          vector.mult(scale)

          p.push()
          p.translate(x * scale, y * scale)
          p.line(0, 0, vector.x, vector.y)
          p.pop()
        }
        yOffset += increment
      }

      tOffset += increment
      yStartOffset -= increment
      xStartOffset -= increment / 2
    }

    p.setup = () => {
      p.createCanvas(WIDTH, HEIGHT, 'p2d')
      p.frameRate(30)
    }

    p.draw = () => {
      p.background(255)
      drawFlowField()
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-screen h-screen p-16 bg-gray-100">
      <div className="bg-white border-4 border-gray-800 shadow-2xl">
        <Sketch sketch={sketch} />
      </div>
    </div>
  )
}

export default FlowField
