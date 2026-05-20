// frontend/src/pages/SelectiveRelayPage.jsx

import { useState } from "react"

export default function SelectiveRelayPage({ onDim }) {

  const [activeMode, setActiveMode] = useState(null)

  const selectMode = (mode) => {
    setActiveMode(mode)
  }

  const resetModes = () => {
    setActiveMode(null)
  }

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 overflow-hidden relative p-10">

      {/* Scanlines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      {/* Top Controls */}
      <div className="flex gap-4 mb-10 z-10 relative">

        <a
          href="/"
          className="w-44 text-center border border-cyan-400 rounded-2xl py-4 text-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_#00ffff50]"
        >
          BACK
        </a>

        <button
          onClick={onDim}
          className="w-44 border border-cyan-400 rounded-2xl py-4 text-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_#00ffff50]"
        >
          DIM
        </button>

      </div>

      {/* Modes */}
      <div className="grid grid-cols-3 gap-8 relative z-10">

        {[1,2,3,4,5,6].map((mode) => (

          <button
            key={mode}
            onClick={() => selectMode(mode)}
            className={`
              h-48 rounded-3xl border text-5xl tracking-widest
              transition-all duration-300

              ${activeMode === mode
                ? "border-green-400 text-green-400 shadow-[0_0_40px_#00ff99] scale-105"
                : "border-cyan-400 text-cyan-400 shadow-[0_0_20px_#00ffff50]"
              }
            `}
          >

            MODE {mode}

          </button>

        ))}

      </div>

      {/* RESET */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center">

        <button
          onClick={resetModes}
          className="w-[400px] h-24 border border-red-500 rounded-3xl text-4xl text-red-500 hover:bg-red-500 hover:text-black transition-all shadow-[0_0_40px_#ff000080]"
        >
          RESET
        </button>

      </div>

    </div>
  )
}