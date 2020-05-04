import React, { useCallback } from 'react'
import p5 from 'p5'
import { range } from 'lodash'
import Sketch from '../../components/Sketch'

const WIDTH = 1000
const HEIGHT = 800

const WaveArt = () => {
  const sketch = useCallback((p: p5) => {
    const resolution = 20
    const rows = HEIGHT / resolution
    const cols = WIDTH / resolution
    const increment = 0.1

    const drawWaves = () => {
      const angles = range(rows).map((y) => {
        const yOffset = y * increment
        return range(cols).map((x) => {
          const xOffset = x * increment
          const angle = p.map(
            p.noise(xOffset, yOffset, p.frameCount * increment),
            0,
            1,
            0,
            p.PI / 2,
          )
          return angle
        })
      })

      // angles.forEach((rows, y) => {
      //   rows.forEach((col, x) => {
      //     const vector = p5.Vector.fromAngle(col)
      //     vector.mult(resolution)
      //     p.push()
      //     p.translate(x * resolution, y * resolution)
      //     p.stroke(0, 50)
      //     p.line(0, 0, vector.x, vector.y)
      //     p.pop()
      //   })
      // })

      range(rows).forEach((y) => {
        const x = 0
        let particleStartX = x * resolution
        let particleStartY = y * resolution
        while (
          particleStartY <= HEIGHT &&
          particleStartY >= 0 &&
          particleStartX <= WIDTH &&
          particleStartX >= 0
        ) {
          const row = p.floor(particleStartY / resolution)
          const col = p.floor(particleStartX / resolution)
          const vectorAngle = p5.Vector.fromAngle(angles[row][col])
          vectorAngle.mult(resolution)
          const nextX = particleStartX + vectorAngle.x
          const nextY = particleStartY + vectorAngle.y
          p.stroke(
            p.map(row, 0, rows, 100, 200),
            100,
            p.map(col, 0, cols, 100, 200),
            p.map(p.noise(nextX, nextY), 0, 1, 100, 150),
          )
          p.line(particleStartX, particleStartY, nextX, nextY)
          particleStartX = nextX
          particleStartY = nextY
        }
      })

      range(1, cols).forEach((x) => {
        const y = 0
        let particleStartX = x * resolution
        let particleStartY = y * resolution
        while (
          particleStartY <= HEIGHT &&
          particleStartY >= 0 &&
          particleStartX <= WIDTH &&
          particleStartX >= 0
        ) {
          const row = p.floor(particleStartY / resolution)
          const col = p.floor(particleStartX / resolution)
          const vectorAngle = p5.Vector.fromAngle(angles[row][col])
          vectorAngle.mult(resolution)
          const nextX = particleStartX + vectorAngle.x
          const nextY = particleStartY + vectorAngle.y
          p.stroke(
            p.map(row, 0, rows, 100, 200),
            100,
            p.map(col, 0, cols, 100, 200),
            p.map(p.noise(nextX, nextY), 0, 1, 100, 150),
          )
          p.line(particleStartX, particleStartY, nextX, nextY)
          particleStartX = nextX
          particleStartY = nextY
        }
      })
    }

    p.setup = () => {
      p.createCanvas(WIDTH, HEIGHT)
      p.background(50, 50, 50)
      p.smooth()
      p.strokeWeight(5)
      p.frameRate(15)
    }

    p.draw = () => {
      p.background(50, 50, 50)
      drawWaves()
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
      <div className="relative bg-white border-4 border-gray-600 shadow-2xl">
        <Sketch style={{ width: WIDTH, height: HEIGHT }} sketch={sketch} />
        <div className="absolute bottom-0 left-0 z-50 px-3 py-2 font-medium text-gray-100 bg-white bg-gray-900">
          Mystical Waves
        </div>
      </div>
    </div>
  )
}

export default WaveArt
