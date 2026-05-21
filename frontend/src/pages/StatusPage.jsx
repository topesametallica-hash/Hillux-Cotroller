import { useEffect, useState } from "react"
import axios from "axios"

export default function StatusPage({ onDim }) {

  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {

    fetchStatus()

    const interval = setInterval(fetchStatus, 2000)

    return () => clearInterval(interval)

  }, [])

  const fetchStatus = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/system/status"
      )

      setStatus(response.data)
      setError(null)

    } catch (err) {

      setError("BACKEND OFFLINE")
    }
  }

  const cardClass =
    "border border-cyan-400 rounded-3xl bg-black/50 p-6 shadow-[0_0_25px_#00ffff40]"

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 overflow-hidden relative p-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-10 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      <div className="flex justify-between items-center mb-10 relative z-10">

        <div>
          <h1 className="text-5xl tracking-widest font-bold">
            SYSTEM STATUS
          </h1>

          <p className="text-2xl text-cyan-300/60 mt-2">
            LIVE DIAGNOSTICS
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

      {error && (
        <div className="relative z-10 border border-red-500 text-red-400 rounded-3xl p-10 text-5xl text-center shadow-[0_0_40px_#ff003380]">
          {error}
        </div>
      )}

      {!error && status && (
        <div className="relative z-10 grid grid-cols-3 gap-8">

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">BACKEND</div>
            <div className="text-5xl text-green-400">ONLINE</div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">GPIO MODE</div>
            <div className="text-5xl text-yellow-400 uppercase">
              {status.gpio_mode}
            </div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">RECORDING</div>
            <div className="text-5xl text-red-400">
              {status.recording ? "ON" : "OFF"}
            </div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">CAMERAS</div>
            <div className="text-5xl">
              {status.cameras.active}/{status.cameras.total}
            </div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">GPS</div>
            <div className="text-5xl text-yellow-400">
              {status.gps}
            </div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">STORAGE FREE</div>
            <div className="text-5xl">
              {status.storage.free_gb} GB
            </div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">AUX BATTERY</div>
            <div className="text-5xl">
              {status.power.aux_voltage}V
            </div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">TEMP</div>
            <div className="text-5xl">
              {status.system.temperature_c}°C
            </div>
          </div>

          <div className={cardClass}>
            <div className="text-2xl text-cyan-300/60 mb-4">UPTIME</div>
            <div className="text-5xl">
              {status.system.uptime}
            </div>
          </div>

        </div>
      )}

    </div>
  )
}