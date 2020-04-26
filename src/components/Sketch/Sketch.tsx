import React, { useRef, useLayoutEffect } from 'react'
import p5 from 'p5'

interface Props {
  sketch: (p: p5) => void
  className?: string
  style?: React.CSSProperties
}

const Sketch: React.FC<Props> = ({ sketch, className, style }) => {
  const container = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    let p: p5 | undefined

    if (container.current) {
      p = new p5(sketch, container.current)
    }

    return () => {
      if (p) {
        p.remove()
      }
    }
  }, [sketch])

  return <div ref={container} className={className} style={style} />
}

export default Sketch
