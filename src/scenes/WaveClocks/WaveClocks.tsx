import React, { useCallback, useState } from 'react'
import Masonry from 'react-masonry-css'
import { range, random } from 'lodash-es'
import ClockFrame from './components/ClockFrame'

const WaveClocks = () => {
  const [frames] = useState(
    range(20).map((val) => ({
      id: val,
      height: random(200, 400),
      iterationCount: 20 * (val + 2),
    })),
  )

  const handleRefresh = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gray-100">
      <div className="max-w-6xl py-4 mx-auto">
        <div className="mb-6">
          <div className="text-3xl font-semibold text-gray-900">
            Wave Clocks
          </div>
          <div className="text-sm text-gray-700">
            Inspired from{' '}
            <a href="https://www.manning.com/books/generative-art">
              <span className="font-medium text-teal-700">
                Generative Art: A practical guide to Processing
              </span>
            </a>
          </div>
        </div>
        <Masonry
          className="flex -ml-6"
          columnClassName="pl-6"
          breakpointCols={{ default: 4 }}
        >
          {frames.map((frame) => (
            <ClockFrame
              key={frame.id}
              height={frame.height}
              iterationCount={frame.iterationCount}
              className="mb-6"
            />
          ))}
        </Masonry>
        <button
          className="fixed bottom-0 right-0 p-2 mb-16 mr-16 text-teal-100 bg-teal-800 rounded-md opacity-75 hover:opacity-100 focus:outline-none focus:shadow-outline"
          onClick={handleRefresh}
        >
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WaveClocks
