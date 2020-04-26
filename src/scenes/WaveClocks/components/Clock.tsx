import React, { useCallback } from 'react'
import p5 from 'p5'
import Sketch from '../../../components/Sketch'

interface Props {
  width: number
  height: number
  iterationCount: number
  className?: string
  style?: React.CSSProperties
}

const Clock: React.FC<Props> = ({
  width,
  height,
  iterationCount,
  className,
  style,
}) => {
  const sketch = useCallback(
    (p: p5) => {
      let radiusNoise = 0
      let angleNoise = 0
      let xNoise = 0
      let yNoise = 0

      let angle = 0

      const MAX_STROKE_COLOR = 200
      const MIN_STROKE_COLOR = 150

      let strokeDelta = 0
      let strokeColor = MIN_STROKE_COLOR

      p.setup = () => {
        p.createCanvas(width, height)
        p.background(255)
        p.frameRate(30)
        p.smooth()
        p.noFill()
        angleNoise = p.random(10)
        radiusNoise = p.random(10)
        xNoise = p.random(10)
        yNoise = p.random(10)
        strokeDelta = -1
        strokeColor = 255

        for (let i = 0; i < iterationCount; i += 1) {
          drawLine()
        }
      }

      const drawLine = () => {
        const centX = width / 2
        const centY = height / 2

        radiusNoise += 0.1
        const thisRadius = p.noise(radiusNoise) * p.min(width, height) + 1

        angleNoise += 0.05
        angle += p.noise(angleNoise) * 6 - 3
        if (angle > 360) {
          angle -= 360
        } else if (angle < 0) {
          angle += 360
        }

        xNoise += 0.01
        const thisCentX = centX + p.noise(xNoise) * 100 - 50

        yNoise += 0.01
        const thisCentY = centY + p.noise(yNoise) * 100 - 50

        const x = thisCentX + p.sin(p.radians(angle)) * thisRadius
        const y = thisCentY + p.cos(p.radians(angle)) * thisRadius

        const opposX = thisCentX + p.sin(p.radians(angle + 180)) * thisRadius
        const opposY = thisCentY + p.cos(p.radians(angle + 180)) * thisRadius

        strokeColor += strokeDelta

        if (strokeColor < MIN_STROKE_COLOR) {
          strokeDelta = 1
        } else if (strokeColor > MAX_STROKE_COLOR) {
          strokeDelta = -1
        }

        p.stroke(strokeColor, 100)
        p.line(x, y, opposX, opposY)
      }
    },
    [height, iterationCount, width],
  )

  return (
    <Sketch
      sketch={sketch}
      className={className}
      style={{ ...style, width, height }}
    />
  )
}

export default Clock
