// frontend/src/pages/MediaPage.jsx

import { useEffect, useState } from "react"

export default function MediaPage({ onDim }) {

  const [progress, setProgress] = useState(32)

  const [volume, setVolume] = useState(72)

  const playlist = [
    "ENTER SANDMAN",
    "MASTER OF PUPPETS",
    "ONE",
    "FADE TO BLACK",
    "ORION",
    "BATTERY"
  ]

  useEffect(() => {

    const interval = setInterval(() => {

      setProgress((prev) => {

        if (prev >= 100) return 0

        return prev + 1
      })

    }, 1000)

    return () => clearInterval(interval)

  }, [])

  const volumeUp = () => {

    setVolume((prev) => {

      if (prev >= 100) return 100

      return prev + 5
    })
  }

  const volumeDown = () => {

    setVolume((prev) => {

      if (prev <= 0) return 0

      return prev - 5
    })
  }

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 overflow-hidden relative p-10">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-10 pointer-events-none" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      {/* TOP */}
      <div className="flex gap-4 mb-10 relative z-10">

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

      {/* MAIN */}
      <div className="flex h-[82%] gap-10 relative z-10">

        {/* LEFT */}
        <div className="w-[34%] flex flex-col gap-8">

          {/* Album */}
          <div className="flex-1 border border-cyan-400 rounded-3xl overflow-hidden shadow-[0_0_40px_#00ffff50] relative flex items-center justify-center">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-black" />

            {/* Vinyl */}
            <div
              className="w-[340px] h-[340px] rounded-full border-[10px] border-cyan-400 relative flex items-center justify-center"
              style={{
                animation: "spinDisc 8s linear infinite",
                boxShadow: "0 0 40px #00ffff"
              }}
            >

              <div className="absolute inset-8 rounded-full border border-cyan-400/40" />
              <div className="absolute inset-16 rounded-full border border-cyan-400/30" />

              <div className="text-4xl tracking-[8px] text-cyan-300/70">

                METALLICA

              </div>

            </div>

          </div>

          {/* Volume */}
          <div className="h-40 border border-cyan-400 rounded-3xl p-6 shadow-[0_0_30px_#00ffff50]">

            <div className="text-2xl mb-4 tracking-[4px]">
              VOLUME
            </div>

            <div className="w-full h-5 border border-cyan-400 rounded-full overflow-hidden mb-5">

              <div
                className="h-full bg-cyan-400 shadow-[0_0_20px_#00ffff]"
                style={{
                  width: `${volume}%`
                }}
              />

            </div>

            <div className="text-right text-3xl text-cyan-300/70">
              {volume}%
            </div>

          </div>

        </div>

        {/* CENTER */}
        <div className="flex-1 border border-cyan-400 rounded-3xl p-10 shadow-[0_0_40px_#00ffff50] relative overflow-hidden">

          {/* SONG */}
          <div className="mb-12">

            <div className="text-6xl tracking-[8px] mb-4">
              ENTER SANDMAN
            </div>

            <div className="text-3xl text-cyan-300/60">
              METALLICA
            </div>

          </div>

          {/* PROGRESS */}
          <div className="mb-16">

            <div className="w-full h-4 border border-cyan-400 rounded-full overflow-hidden">

              <div
                className="h-full bg-cyan-400 shadow-[0_0_20px_#00ffff]"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>

            <div className="flex justify-between text-xl text-cyan-300/60 mt-3">

              <span>1:24</span>
              <span>5:31</span>

            </div>

          </div>

          {/* CONTROLS */}
          <div className="flex justify-center gap-10 mb-16">

            {["⏮", "▶", "⏭"].map((btn) => (

              <button
                key={btn}
                className="w-28 h-28 border border-cyan-400 rounded-full text-5xl hover:bg-cyan-400 hover:text-black transition-all hover:scale-110 shadow-[0_0_30px_#00ffff80]"
              >
                {btn}
              </button>

            ))}

          </div>

          {/* PLAYLIST */}
          <div className="mb-12">

            <div className="text-3xl tracking-[4px] mb-6">
              PLAYLIST
            </div>

            <div className="space-y-4">

              {playlist.map((song, index) => (

                <div
                  key={song}
                  className={`
                    h-16 rounded-2xl border px-6 flex items-center text-2xl tracking-[3px]
                    transition-all

                    ${index === 0
                      ? "border-green-400 text-green-400 shadow-[0_0_20px_#00ff99]"
                      : "border-cyan-400 text-cyan-300/70"
                    }
                  `}
                >

                  {index === 0 && "▶ "}
                  {song}

                </div>

              ))}

            </div>

          </div>

          {/* Equalizer */}
          <div className="absolute bottom-8 left-10 right-10 flex items-end gap-3 h-32">

            {[40,70,90,50,80,30,100,60,40,90,50,75].map((h, i) => (

              <div
                key={i}
                className="flex-1 bg-cyan-400 rounded-t-xl shadow-[0_0_20px_#00ffff]"
                style={{
                  height: `${h}%`,
                  animation: `equalizer ${1 + i * 0.1}s infinite alternate`
                }}
              />

            ))}

          </div>

        </div>

        {/* RIGHT */}
        <div className="w-[220px] flex flex-col gap-8">

          {/* VOL + */}
          <button
            onClick={volumeUp}
            className="flex-1 border border-green-400 rounded-3xl text-6xl tracking-[6px]
            hover:bg-green-400 hover:text-black transition-all duration-300
            shadow-[0_0_40px_#00ff99] hover:scale-105"
          >
            VOL +
          </button>

          {/* VOL - */}
          <button
            onClick={volumeDown}
            className="flex-1 border border-red-400 rounded-3xl text-6xl tracking-[6px]
            hover:bg-red-400 hover:text-black transition-all duration-300
            shadow-[0_0_40px_#ff4444] hover:scale-105"
          >
            VOL -
          </button>

        </div>

      </div>

    </div>
  )
}