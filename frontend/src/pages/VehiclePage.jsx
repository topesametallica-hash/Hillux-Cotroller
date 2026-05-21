// frontend/src/pages/VehiclePage.jsx

import { useEffect, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

const socket = io("http://127.0.0.1:8000")

export default function VehiclePage({ onDim }) {

  const [vehicle, setVehicle] = useState({})

  useEffect(() => {

    fetchVehicleState()

    socket.on("vehicle_update", (data) => {
      setVehicle(data)
    })

    return () => {
      socket.off("vehicle_update")
    }

  }, [])

  const fetchVehicleState = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/vehicle/state"
      )

      setVehicle(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  const toggleSignal = async (signal) => {

    try {

      await axios.post(
        `http://127.0.0.1:8000/vehicle/${signal}/toggle`
      )

    } catch (error) {

      console.error(error)
    }
  }

  const signals = [
    ["ACC", "acc"],
    ["IGNITION", "ignition"],
    ["REVERSE", "reverse"],
    ["LIGHTS", "lights"],
    ["HANDBRAKE", "handbrake"],
    ["BRAKE", "brake"],
    ["DOOR", "door"],
    ["PARKING", "parking_mode"],
    ["NIGHT", "night_mode"],
  ]

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 overflow-hidden relative p-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-10 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      <div className="flex justify-between items-center mb-10 relative z-10">

        <div>
          <h1 className="text-5xl tracking-widest font-bold">
            VEHICLE STATE
          </h1>

          <p className="text-2xl text-cyan-300/60 mt-2">
            INPUT SIGNAL SIMULATION
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

      <div className="relative z-10 grid grid-cols-3 gap-8">

        {signals.map(([label, signal]) => {

          const active = vehicle[signal]

          const locked = signal === "parking_mode" || signal === "night_mode"

          return (

            <button
              key={signal}
              onClick={() => {
                if (!locked) {
                  toggleSignal(signal)
                }
              }}
              className={`
                h-48 rounded-3xl border text-4xl tracking-[5px]
                transition-all duration-300 relative overflow-hidden

                ${active
                  ? "border-green-400 text-green-300 shadow-[0_0_40px_#00ff88]"
                  : "border-red-500 text-red-400 shadow-[0_0_30px_#ff003380]"
                }

                ${locked ? "cursor-default opacity-80" : "cursor-pointer hover:scale-105"}
              `}
            >

              <div
                className={`
                  absolute inset-0 opacity-20

                  ${active ? "bg-green-400" : "bg-red-500"}
                `}
              />

              <div className="relative z-10 flex flex-col items-center justify-center h-full">

                <div className="text-7xl mb-5">
                  {active ? "●" : "○"}
                </div>

                <div>
                  {label}
                </div>

                <div className="text-2xl mt-5 tracking-[3px]">
                  {locked ? "AUTO" : active ? "ON" : "OFF"}
                </div>

              </div>

            </button>
          )
        })}

      </div>

      <div className="absolute bottom-8 left-0 w-full text-center text-yellow-400 text-2xl tracking-[4px] z-10">
        REVERSE ON = GLOBAL REAR CAMERA OVERLAY
      </div>

    </div>
  )
}