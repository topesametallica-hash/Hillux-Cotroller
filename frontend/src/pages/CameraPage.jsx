import { useEffect, useState } from "react"

export default function CameraPage({ onDim }) {

  const cameras = [
    "FRONT",
    "REAR",
    "LEFT",
    "RIGHT",
    "CABIN",
    "TRAILER"
  ]

  const [fullscreenCam, setFullscreenCam] = useState(null)

  const [time, setTime] = useState("")

  const [signal, setSignal] = useState([
    4,4,4,4,4,4
  ])

  useEffect(() => {

    const updateClock = () => {

      const now = new Date()

      setTime(
        now.toLocaleTimeString()
      )
    }

    updateClock()

    const clock = setInterval(updateClock, 1000)

    return () => clearInterval(clock)

  }, [])

  useEffect(() => {

    const interval = setInterval(() => {

      setSignal(
        signal.map(() =>
          Math.floor(Math.random() * 2) + 3
        )
      )

    }, 1200)

    return () => clearInterval(interval)

  }, [])

  /* REVERSE CAMERA TRIGGER */

  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "r" || e.key === "R") {

        setFullscreenCam(1)
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("keydown", handleKey)
    }

  }, [])

  const signalBars = (count) => {

    return "▰".repeat(count)
  }

  /* FULLSCREEN */

  if (fullscreenCam !== null) {

    return (

      <div
        onClick={() => setFullscreenCam(null)}
        className="w-screen h-screen bg-black flex items-center justify-center text-cyan-400 relative overflow-hidden cursor-pointer"
      >

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-20 pointer-events-none" />

        {/* Static */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_51%)] bg-[length:100%_3px]" />

        {/* Reverse Warning */}
        {fullscreenCam === 1 && (

          <div className="absolute top-24 left-1/2 -translate-x-1/2 text-3xl text-yellow-400 tracking-[6px] animate-pulse z-20">

            REAR CAMERA ACTIVE

          </div>

        )}

        {/* DIM */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDim()
          }}
          className="absolute top-6 right-40 border border-cyan-400 px-6 py-3 rounded-2xl text-2xl hover:bg-cyan-400 hover:text-black transition-all z-20"
        >
          DIM
        </button>

        {/* Feed */}
        <div className="w-[92%] h-[92%] border border-cyan-400 rounded-3xl relative overflow-hidden shadow-[0_0_40px_#00ffff80]">

          {/* Fake Motion */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,255,255,0.1), transparent)",
              animation: "cameraMotion 6s linear infinite"
            }}
          />

          {/* Glow */}
          <div className="absolute inset-0 bg-cyan-400/5" />

          {/* Name */}
          <div className="absolute inset-0 flex items-center justify-center text-8xl tracking-[10px] text-cyan-300/70">

            {cameras[fullscreenCam]}

          </div>

          {/* Timestamp */}
          <div className="absolute top-6 left-6 text-2xl text-cyan-300">
            {time}
          </div>

          {/* LIVE */}
          <div className="absolute top-6 right-6 text-3xl text-green-400">
            ● LIVE
          </div>

          {/* REC */}
          <div className="absolute bottom-6 right-6 text-3xl text-red-500 animate-pulse">
            ● REC
          </div>

          {/* Signal */}
          <div className="absolute bottom-6 left-6 text-2xl text-cyan-300">
            SIGNAL {signalBars(signal[fullscreenCam])}
          </div>

        </div>

      </div>
    )
  }

  /* GRID */

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 flex flex-col p-10 overflow-hidden relative">

      {/* Scanlines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      {/* Top */}
      <div className="flex gap-4 mb-10 z-10">

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

      {/* Grid */}
      <div className="grid grid-cols-3 gap-8 z-10">

        {cameras.map((cam, index) => (

          <button
            key={cam}
            onClick={() => setFullscreenCam(index)}
            className="h-64 rounded-3xl border border-cyan-400 shadow-[0_0_20px_#00ffff50] relative overflow-hidden hover:scale-[1.03] hover:shadow-[0_0_40px_#00ffff] transition-all cursor-pointer"
          >

            {/* Motion */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,255,255,0.2), transparent)",
                animation: "cameraMotion 8s linear infinite"
              }}
            />

            {/* Static */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_51%)] bg-[length:100%_3px]" />

            {/* Glow */}
            <div className="absolute inset-0 bg-cyan-400/5 pointer-events-none" />

            {/* Name */}
            <div className="absolute top-4 left-4 text-3xl tracking-widest">
              {cam}
            </div>

            {/* Time */}
            <div className="absolute top-4 right-4 text-lg text-cyan-300/60">
              {time}
            </div>

            {/* LIVE */}
            <div className="absolute bottom-4 left-4 text-green-400 text-xl">
              ● LIVE
            </div>

            {/* REC */}
            <div className="absolute bottom-4 right-4 text-red-500 animate-pulse text-xl">
              ● REC
            </div>

            {/* Signal */}
            <div className="absolute bottom-14 left-4 text-cyan-300 text-lg">
              SIGNAL {signalBars(signal[index])}
            </div>

          </button>

        ))}

      </div>

    </div>
  )
}