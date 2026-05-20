// frontend/src/components/BootScreen.jsx

import { useEffect, useState } from "react"

export default function BootScreen() {

  const lines = [
    "INITIALIZING SYSTEM...",
    "GPIO ONLINE",
    "CAMERA BUS READY",
    "RADAR ONLINE",
    "WEBSOCKET CONNECTED",
    "VEHICLE SYSTEM READY"
  ]

  const [visibleLines, setVisibleLines] = useState([])

  useEffect(() => {

    lines.forEach((line, index) => {

      setTimeout(() => {

        setVisibleLines((prev) => {

          if (prev.includes(line)) return prev

          return [...prev, line]
        })

      }, index * 700)

    })

  }, [])

  return (
    <div className="w-screen h-screen bg-black text-green-400 overflow-hidden relative flex items-center justify-center">

      {/* Matrix Background */}
      <div className="absolute inset-0 matrix-bg opacity-20" />

      {/* Flicker Overlay */}
      <div className="absolute inset-0 boot-flicker pointer-events-none" />

      {/* Content */}
      <div className="z-10 text-center">

        <h1
          className="text-7xl tracking-[12px] mb-16"
          style={{
            animation: "bootGlow 1.5s infinite"
          }}
        >
          HILLUX OS
        </h1>

        <div className="space-y-5 text-2xl text-green-300">

          {visibleLines.map((line, index) => (

            <div
              key={line}
              className="boot-line"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {line}
            </div>

          ))}

        </div>

      </div>

    </div>
  )
}