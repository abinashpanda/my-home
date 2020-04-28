import React, { useCallback } from 'react'
import Sketch from '../../components/Sketch'
import p5 from 'p5'

const WIDTH = 1366
const HEIGHT = 768

const Mountains = () => {
  const sketch = useCallback((p: p5) => {
    // subract twice the border width
    const width = WIDTH - 8
    // subract twice the border width
    const height = HEIGHT - 8

    const drawMountain = ({
      slope,
      startX,
      startY,
      height,
    }: {
      slope: number
      startX: number
      startY: number
      height: number
    }) => {
      let randomNoise = p.random(10)

      const baseWidth = height / p.tan(p.radians(slope))
      const vertices: Array<Array<number>> = []

      const stepSize = 20

      const generateNoise = (noise: number) => {
        return p.abs(p.noise(noise) * 10)
      }

      for (let x = 0; x < baseWidth; x += stepSize) {
        randomNoise += 1
        const noise = generateNoise(randomNoise)
        const vertex = [
          startX + x,
          startY - x * p.tan(p.radians(slope)) - noise,
        ]
        vertices.push(vertex)
      }

      for (let x = stepSize; x < baseWidth; x += stepSize) {
        randomNoise += 1
        const noise = generateNoise(randomNoise)
        const vertex = [
          startX + baseWidth + x,
          startY - height + x * p.tan(p.radians(slope)) + noise,
        ]
        vertices.push(vertex)
      }

      p.beginShape()

      vertices.forEach((vertex) => {
        p.vertex(vertex[0], vertex[1])
      })
      p.endShape()
    }

    p.setup = () => {
      p.createCanvas(width, height)
      p.smooth()
      p.background(255)
      p.stroke(0, 80)
      const centX = width / 2 - 200
      const centY = height / 2
      for (let i = 0; i < 1; i += 1) {
        drawMountain({
          slope: 35,
          startX: centX + p.random(30, 50),
          startY: centY - p.random(20, 30),
          height: 80,
        })
        drawMountain({
          slope: 25,
          startX: centX - p.random(20, 50),
          startY: centY,
          height: 60,
        })
        drawMountain({
          slope: 40,
          startX: centX + p.random(160, 220),
          startY: centY - p.random(20, 30),
          height: 120,
        })
        drawMountain({
          slope: 40,
          startX: centX + p.random(150, 200),
          startY: centY,
          height: 120,
        })
        drawMountain({
          slope: 45,
          startX: centX + p.random(350, 400),
          startY: centY + p.random(20, 30),
          height: 120,
        })
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-screen h-screen p-8 bg-gray-100">
      <div
        className="bg-white border-4 border-gray-900 shadow-2xl"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <Sketch sketch={sketch} />
      </div>
    </div>
  )
}

export default Mountains
