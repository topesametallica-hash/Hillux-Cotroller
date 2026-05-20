import { useEffect, useState } from "react"

export default function NavPage({ onDim }) {

  const [speed, setSpeed] = useState(84)

  useEffect(() => {

    const interval = setInterval(() => {

      setSpeed((prev) => {

        const random = Math.floor(Math.random() * 6) - 3

        let next = prev + random

        if (next < 70) next = 70
        if (next > 110) next = 110

        return next
      })

    }, 1200)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative text-cyan-400">

      {/* MAP */}
      <div className="absolute inset-0">

        <iframe
          title="map"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter:
              "invert(1) hue-rotate(180deg) contrast(1.2) brightness(0.7)"
          }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=tbilisi&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />

      </div>

      {/* HUD OVERLAY */}
      <div className="absolute inset-0 bg-cyan-400/5 pointer-events-none" />

      {/* Scanlines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.08)_51%)] bg-[length:100%_4px]" />

      {/* TOP */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20">

        <div className="flex gap-4">

          <a
            href="/"
            className="w-44 text-center border border-cyan-400 rounded-2xl py-4 text-2xl bg-black/60 backdrop-blur-md hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_#00ffff50]"
          >
            BACK
          </a>

          <button
            onClick={onDim}
            className="w-44 border border-cyan-400 rounded-2xl py-4 text-2xl bg-black/60 backdrop-blur-md hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_#00ffff50]"
          >
            DIM
          </button>

        </div>

        {/* GPS */}
        <div className="px-8 py-4 border border-green-400 rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_0_20px_#00ff99] text-2xl tracking-[4px] text-green-400">

          GPS ONLINE

        </div>

      </div>

      {/* LEFT SIDE */}
      <div className="absolute left-6 top-32 bottom-6 w-[280px] flex flex-col gap-6 z-20">

        {/* SPEED */}
        <div className="flex-1 border border-cyan-400 rounded-3xl bg-black/60 backdrop-blur-md shadow-[0_0_40px_#00ffff50] flex flex-col items-center justify-center relative overflow-hidden">

          {/* Glow Pulse */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,255,0.5), transparent)",
              animation: "pulseGlow 2s infinite"
            }}
          />

          <div className="text-2xl tracking-[4px] text-cyan-300/60 mb-6">
            SPEED
          </div>

          <div className="text-[120px] tracking-[8px] leading-none">

            {speed}

          </div>

          <div className="text-3xl text-cyan-300/60 mt-4">
            KM/H
          </div>

        </div>

        {/* RADAR */}
        <div className="h-[260px] border border-cyan-400 rounded-3xl bg-black/60 backdrop-blur-md shadow-[0_0_40px_#00ffff50] flex items-center justify-center relative overflow-hidden">

          <div className="absolute inset-10 rounded-full border border-cyan-400/20" />
          <div className="absolute inset-20 rounded-full border border-cyan-400/20" />

          {/* Sweep */}
          <div
            className="absolute w-1 h-28 origin-bottom"
            style={{
              background:
                "linear-gradient(to top, #00ffff, transparent)",
              animation: "radarSweep 3s linear infinite",
              boxShadow: "0 0 20px #00ffff"
            }}
          />

          <div className="absolute text-2xl tracking-[4px] bottom-6">
            RADAR
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="absolute right-6 top-32 bottom-6 w-[340px] flex flex-col gap-6 z-20">

        {/* ETA */}
        <div className="h-[220px] border border-cyan-400 rounded-3xl bg-black/60 backdrop-blur-md shadow-[0_0_40px_#00ffff50] flex flex-col items-center justify-center">

          <div className="text-2xl tracking-[4px] text-cyan-300/60 mb-4">
            ETA
          </div>

          <div className="text-6xl tracking-[8px]">
            12 MIN
          </div>

          <div className="text-2xl text-cyan-300/60 mt-6">
            8.4 KM
          </div>

        </div>

        {/* TELEMETRY */}
        <div className="flex-1 border border-cyan-400 rounded-3xl bg-black/60 backdrop-blur-md shadow-[0_0_40px_#00ffff50] p-8">

          <div className="text-2xl tracking-[4px] text-cyan-300/60 mb-8">
            TELEMETRY
          </div>

          <div className="space-y-7 text-2xl">

            <div>LAT: 41.7151</div>
            <div>LON: 44.8271</div>
            <div>ALT: 462M</div>
            <div>HEADING: N</div>
            <div>GPS: STABLE</div>
            <div>TRAFFIC: LOW</div>
            <div>ROUTE: LOCKED</div>

          </div>

        </div>

      </div>

      {/* CENTER ROUTE */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] z-20">

        <div className="border border-cyan-400 rounded-3xl bg-black/60 backdrop-blur-md shadow-[0_0_40px_#00ffff50] p-6">

          <div className="flex justify-between text-2xl tracking-[4px] mb-4">

            <span>ROUTE PROGRESS</span>
            <span>68%</span>

          </div>

          {/* Progress */}
          <div className="w-full h-5 border border-cyan-400 rounded-full overflow-hidden">

            <div
              className="h-full bg-cyan-400 shadow-[0_0_20px_#00ffff]"
              style={{
                width: "68%"
              }}
            />

          </div>

        </div>

      </div>

      {/* WARNING */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 text-yellow-400 tracking-[8px] text-2xl animate-pulse z-20">

        NAVIGATION ACTIVE

      </div>

    </div>
  )
}