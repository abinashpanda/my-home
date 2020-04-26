import React, { useRef } from 'react'
import { useRect } from '@reach/rect'
import clsx from 'clsx'
import Clock from './Clock'

interface Props {
  height: number
  iterationCount: number
  className?: string
  style?: React.CSSProperties
}

const ClockFrame: React.FC<Props> = ({
  height,
  iterationCount,
  className,
  style,
}) => {
  const container = useRef<HTMLDivElement | null>(null)
  const containerRect = useRect(container)

  return (
    <div
      ref={container}
      className={clsx(
        'border-4 border-gray-700 shadow-2xl cursor-pointer relative',
        className,
      )}
      style={style}
    >
      {containerRect ? (
        <Clock
          // removing border width
          width={containerRect.width - 8}
          height={height}
          iterationCount={iterationCount}
        />
      ) : null}
      <div className="absolute bottom-0 right-0 mb-2 mr-2 text-xs text-gray-500">
        {iterationCount}
      </div>
    </div>
  )
}

export default ClockFrame
