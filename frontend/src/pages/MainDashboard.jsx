// frontend/src/pages/MainDashboard.jsx

import { useEffect, useState } from "react"

export default function MainDashboard({ onDim }) {

  const [time, setTime] = useState("")

  useEffect(() => {

    const updateClock = () => {

      const now = new Date()

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }

    updateClock()

    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 overflow-hidden relative">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-10 pointer-events-none" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      {/* TOP */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 border-b border-cyan-500/20 z-10">

        <div>

          <h1 className="text-5xl font-bold tracking-widest">
            HILLUX OS
          </h1>

          <p className="text-2xl text-cyan-300/60 mt-2">
            SYSTEM ONLINE
          </p>

        </div>

        <div className="flex items-center gap-10">

          <div className="text-right">

            <div className="text-5xl tracking-widest">
              {time}
            </div>

            <div className="text-cyan-300/60 text-xl">
              WEATHER 18°C
            </div>

          </div>

          <button
            onClick={onDim}
            className="border border-cyan-400 px-6 py-4 rounded-2xl hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 shadow-[0_0_20px_#00ffff50] text-2xl cursor-pointer"
          >
            DIM
          </button>

        </div>

      </div>

      {/* RADAR */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <div className="relative w-[500px] h-[500px] rounded-full border border-cyan-500/30">

          <div className="absolute inset-10 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-20 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-32 rounded-full border border-cyan-500/20" />

          <div
            className="absolute left-1/2 top-1/2 w-1 h-64 origin-bottom rounded-full"
            style={{
              background: "linear-gradient(to top, #00ffff, transparent)",
              boxShadow: "0 0 20px #00ffff",
              animation: "radarSweep 4s linear infinite",
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full"
            style={{
              boxShadow: "0 0 30px #00ffff",
              animation: "pulseGlow 2s infinite",
            }}
          />

        </div>

      </div>

      {/* BUTTONS */}
      <div className="absolute bottom-16 left-0 w-full z-10 flex justify-center">

        <div className="grid grid-cols-4 gap-6">

          {[
  ["RELAYS", "/relays"],
  ["CAMS", "/cameras"],
  ["MEDIA", "/media"],
  ["NAV", "/nav"],
  ["VEHICLE", "/vehicle"],
  ["STATUS", "/status"],
  ["LOGS", "/logs"],
  ["SETTINGS", "/settings"],
].map(([label, path]) => (

            <a
              key={label}
              href={path}
              className="w-56 h-24 border border-cyan-400 rounded-3xl text-2xl tracking-widest hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 shadow-[0_0_30px_#00ffff80] flex items-center justify-center cursor-pointer"
            >
              {label}
            </a>

          ))}

        </div>

      </div>

      {/* STATUS */}
      <div className="absolute bottom-4 left-0 w-full flex justify-between px-6 text-2xl text-cyan-300/70 z-10">

        <div className="flex gap-8">

          <div>GPIO ●</div>
          <div>REC ●</div>
          <div>NET ●</div>
          <div>GPS ●</div>

        </div>

        <div>BATTERY: 12.8V</div>

      </div>

    </div>
  )
}