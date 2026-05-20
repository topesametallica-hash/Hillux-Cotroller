// frontend/src/pages/RelayPage.jsx

import { useEffect, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

/* SOCKET */

const socket = io("http://127.0.0.1:8000")

export default function RelayPage({ onDim }) {

  const [relays, setRelays] = useState({})

  /* LOAD RELAYS */

  useEffect(() => {

    fetchRelays()

  }, [])

  const fetchRelays = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/relays"
      )

      setRelays(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  /* SOCKET EVENTS */

  useEffect(() => {

    socket.on("connect", () => {

      console.log("SOCKET CONNECTED")
    })

    socket.on("relay_update", (data) => {

      console.log("RELAY UPDATE:", data)

      setRelays((prev) => ({
        ...prev,
        [data.relay]: data.state
      }))

    })

    return () => {

      socket.off("relay_update")
    }

  }, [])

  /* TOGGLE RELAY */

  const toggleRelay = async (relayId) => {

    try {

      await axios.post(
        `http://127.0.0.1:8000/relay/${relayId}`
      )

    } catch (error) {

      console.error(error)
    }
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative text-cyan-400">

      {/* Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-10" />

      {/* Scanlines */}

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      {/* TOP BAR */}

      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 border-b border-cyan-500/20 z-10">

        <div>

          <h1 className="text-5xl tracking-widest font-bold">
            RELAY CONTROL
          </h1>

          <p className="text-2xl text-cyan-300/60 mt-2">
            REALTIME GPIO ONLINE
          </p>

        </div>

        <div className="flex gap-4">

          <button
            onClick={onDim}
            className="border border-cyan-400 px-6 py-4 rounded-2xl text-2xl hover:bg-cyan-400 hover:text-black transition-all"
          >
            DIM
          </button>

          <a
            href="/"
            className="border border-cyan-400 px-6 py-4 rounded-2xl text-2xl hover:bg-cyan-400 hover:text-black transition-all"
          >
            BACK
          </a>

        </div>

      </div>

      {/* RELAY GRID */}

      <div className="absolute inset-0 pt-40 px-10 pb-10 grid grid-cols-4 gap-8">

        {[1,2,3,4,5,6,7,8].map((relayId) => {

          const active = relays[relayId]

          return (

            <button
              key={relayId}
              onClick={() => toggleRelay(relayId)}
              className={`
                relative
                rounded-3xl
                border
                overflow-hidden
                transition-all
                duration-300
                backdrop-blur-md

                ${active
                  ? "border-green-400 text-green-300 shadow-[0_0_40px_#00ff88]"
                  : "border-red-500 text-red-400 shadow-[0_0_30px_#ff003380]"
                }
              `}
            >

              {/* BACKGROUND GLOW */}

              <div
                className={`
                  absolute inset-0 opacity-20

                  ${active
                    ? "bg-green-400"
                    : "bg-red-500"
                  }
                `}
              />

              {/* CONTENT */}

              <div className="relative z-10 h-full flex flex-col items-center justify-center">

                {/* STATUS ICON */}

                <div className="text-7xl mb-6">

                  {active ? "●" : "○"}

                </div>

                {/* RELAY NAME */}

                <div className="text-4xl tracking-[6px]">

                  RELAY {relayId}

                </div>

                {/* STATUS */}

                <div className="mt-6 text-2xl tracking-[4px]">

                  {active ? "ONLINE" : "OFFLINE"}

                </div>

              </div>

            </button>

          )
        })}

      </div>

    </div>
  )
}