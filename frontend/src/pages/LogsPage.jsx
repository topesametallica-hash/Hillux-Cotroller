// frontend/src/pages/LogsPage.jsx

import { useEffect, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

const socket = io("http://127.0.0.1:8000")

export default function LogsPage({ onDim }) {

  const [events, setEvents] = useState([])

  useEffect(() => {

    fetchEvents()

    socket.on("event_log_update", (event) => {

      setEvents((prev) => [
        event,
        ...prev
      ].slice(0, 200))

    })

    return () => {
      socket.off("event_log_update")
    }

  }, [])

  const fetchEvents = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/events"
      )

      setEvents(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  const clearEvents = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/events/clear"
      )

      fetchEvents()

    } catch (error) {

      console.error(error)
    }
  }

  const getLevelClass = (level) => {

    if (level === "success") {
      return "border-green-400 text-green-400 shadow-[0_0_20px_#00ff99]"
    }

    if (level === "danger") {
      return "border-red-500 text-red-400 shadow-[0_0_25px_#ff0033]"
    }

    if (level === "warning") {
      return "border-yellow-400 text-yellow-400 shadow-[0_0_20px_#ffaa00]"
    }

    return "border-cyan-400 text-cyan-400 shadow-[0_0_20px_#00ffff50]"
  }

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 overflow-hidden relative p-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-10 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      {/* TOP */}

      <div className="flex justify-between items-center mb-10 relative z-10">

        <div>
          <h1 className="text-5xl tracking-widest font-bold">
            EVENT LOG
          </h1>

          <p className="text-2xl text-cyan-300/60 mt-2">
            REALTIME VEHICLE HISTORY
          </p>
        </div>

        <div className="flex gap-4">

          <button
            onClick={clearEvents}
            className="w-44 border border-yellow-400 text-yellow-400 rounded-2xl py-4 text-2xl hover:bg-yellow-400 hover:text-black transition-all shadow-[0_0_20px_#ffaa0050]"
          >
            CLEAR
          </button>

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

      {/* LOG LIST */}

      <div className="relative z-10 h-[78%] overflow-y-auto pr-4 space-y-4">

        {events.length === 0 && (

          <div className="border border-cyan-400 rounded-3xl p-10 text-4xl text-center text-cyan-300/60 shadow-[0_0_30px_#00ffff40]">
            NO EVENTS YET
          </div>
        )}

        {events.map((event, index) => (

          <div
            key={`${event.time}-${index}`}
            className={`
              border rounded-3xl bg-black/60 p-5 flex items-center gap-8
              ${getLevelClass(event.level)}
            `}
          >

            <div className="w-36 text-3xl tracking-[3px]">
              {event.time}
            </div>

            <div className="w-48 text-2xl tracking-[4px]">
              {event.type}
            </div>

            <div className="flex-1 text-3xl tracking-[3px]">
              {event.message}
            </div>

            <div className="text-2xl uppercase opacity-70">
              {event.level}
            </div>

          </div>

        ))}

      </div>

      <div className="absolute bottom-4 left-0 w-full text-center text-cyan-300/50 text-xl tracking-[4px] z-10">
        LAST {events.length} EVENTS
      </div>

    </div>
  )
}