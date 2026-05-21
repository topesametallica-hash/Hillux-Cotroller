import { useState } from "react"

export default function SettingsPage({ onDim }) {

  const [bootAnimation, setBootAnimation] = useState(true)
  const [nightMode, setNightMode] = useState(false)
  const [recordingQuality, setRecordingQuality] = useState("1080p")
  const [relaySafety, setRelaySafety] = useState(true)

  const rowClass =
    "border border-cyan-400 rounded-3xl bg-black/50 p-6 shadow-[0_0_25px_#00ffff40] flex justify-between items-center"

  const buttonClass =
    "border border-cyan-400 rounded-2xl px-8 py-4 text-2xl hover:bg-cyan-400 hover:text-black transition-all"

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 overflow-hidden relative p-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-10 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      <div className="flex justify-between items-center mb-10 relative z-10">

        <div>
          <h1 className="text-5xl tracking-widest font-bold">
            SETTINGS
          </h1>

          <p className="text-2xl text-cyan-300/60 mt-2">
            VEHICLE OS CONFIGURATION
          </p>
        </div>

        <div className="flex gap-4">

          <button
            onClick={onDim}
            className="w-44 border border-cyan-400 rounded-2xl py-4 text-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_#00ffff50]"
          >
            DIM
          </button>

          <a
            href="/"
            className="w-44 text-center border border-cyan-400 rounded-2xl py-4 text-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_#00ffff50]"
          >
            BACK
          </a>

        </div>

      </div>

      <div className="relative z-10 grid grid-cols-2 gap-8">

        <div className={rowClass}>
          <div>
            <div className="text-3xl">BOOT ANIMATION</div>
            <div className="text-xl text-cyan-300/60 mt-2">
              Matrix startup screen
            </div>
          </div>

          <button
            onClick={() => setBootAnimation(!bootAnimation)}
            className={buttonClass}
          >
            {bootAnimation ? "ON" : "OFF"}
          </button>
        </div>

        <div className={rowClass}>
          <div>
            <div className="text-3xl">NIGHT MODE</div>
            <div className="text-xl text-cyan-300/60 mt-2">
              Darker low-glare interface
            </div>
          </div>

          <button
            onClick={() => setNightMode(!nightMode)}
            className={buttonClass}
          >
            {nightMode ? "ON" : "OFF"}
          </button>
        </div>

        <div className={rowClass}>
          <div>
            <div className="text-3xl">RECORD QUALITY</div>
            <div className="text-xl text-cyan-300/60 mt-2">
              Camera recording resolution
            </div>
          </div>

          <button
            onClick={() =>
              setRecordingQuality(recordingQuality === "1080p" ? "720p" : "1080p")
            }
            className={buttonClass}
          >
            {recordingQuality}
          </button>
        </div>

        <div className={rowClass}>
          <div>
            <div className="text-3xl">RELAY SAFETY</div>
            <div className="text-xl text-cyan-300/60 mt-2">
              Later: long press for critical outputs
            </div>
          </div>

          <button
            onClick={() => setRelaySafety(!relaySafety)}
            className={buttonClass}
          >
            {relaySafety ? "ON" : "OFF"}
          </button>
        </div>

      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center z-10">

        <div className="border border-yellow-400 text-yellow-400 rounded-3xl px-10 py-5 text-2xl tracking-[4px] shadow-[0_0_30px_#ffaa0080]">
          SETTINGS ARE LOCAL UI ONLY FOR NOW
        </div>

      </div>

    </div>
  )
}