// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import MainDashboard from "./pages/MainDashboard"
import RelayPage from "./pages/RelayPage"
import CameraPage from "./pages/CameraPage"
import MediaPage from "./pages/MediaPage"
import NavPage from "./pages/NavPage"

import DimOverlay from "./components/DimOverlay"
import BootScreen from "./components/BootScreen"

function App() {

  /* DIM */

  const [dimMode, setDimMode] = useState(0)

  /* BOOT */

  const [bootFinished, setBootFinished] = useState(() => {

    return sessionStorage.getItem("bootFinished") === "true"

  })

  /* REVERSE CAMERA */

  const [reverseActive, setReverseActive] = useState(false)

  /* KEYBOARD TEST */

  useEffect(() => {

    const handleKey = (e) => {

      /* REVERSE ON */

      if (e.key === "r" || e.key === "R") {

        setReverseActive(true)
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("keydown", handleKey)
    }

  }, [])

  /* BOOT */

  useEffect(() => {

    if (!bootFinished) {

      const timer = setTimeout(() => {

        sessionStorage.setItem("bootFinished", "true")

        setBootFinished(true)

      }, 5000)

      return () => clearTimeout(timer)
    }

  }, [bootFinished])

  /* DIM */

  const handleDim = () => {

    if (dimMode === 0) {

      setDimMode(1)
    }

    else if (dimMode === 1) {

      setDimMode(2)
    }

    else {

      setDimMode(0)
    }
  }

  const wakeUp = () => {

    setDimMode(0)
  }

  /* BOOT */

  if (!bootFinished) {

    return <BootScreen />
  }

  return (
    <>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={
              <MainDashboard
                onDim={handleDim}
              />
            }
          />

          <Route
            path="/relays"
            element={
              <RelayPage
                onDim={handleDim}
              />
            }
          />

          <Route
            path="/cameras"
            element={
              <CameraPage
                onDim={handleDim}
              />
            }
          />

          <Route
            path="/media"
            element={
              <MediaPage
                onDim={handleDim}
              />
            }
          />

          <Route
            path="/nav"
            element={
              <NavPage
                onDim={handleDim}
              />
            }
          />

        </Routes>

      </BrowserRouter>

      {/* GLOBAL REVERSE CAMERA */}

      {reverseActive && (

        <div
          onClick={() => setReverseActive(false)}
          className="fixed inset-0 z-[9998] bg-black flex items-center justify-center text-cyan-400 cursor-pointer"
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-20" />

          {/* Static */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_51%)] bg-[length:100%_3px]" />

          {/* Warning */}
          <div className="absolute top-20 text-4xl text-yellow-400 tracking-[8px] animate-pulse">

            REAR CAMERA ACTIVE

          </div>

          {/* Feed */}
          <div className="w-[92%] h-[92%] border border-cyan-400 rounded-3xl relative overflow-hidden shadow-[0_0_40px_#00ffff80]">

            {/* Motion */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,255,255,0.1), transparent)",
                animation: "cameraMotion 6s linear infinite"
              }}
            />

            {/* Camera Name */}
            <div className="absolute inset-0 flex items-center justify-center text-8xl tracking-[10px] text-cyan-300/70">

              REAR CAMERA

            </div>

            {/* LIVE */}
            <div className="absolute top-6 right-6 text-3xl text-green-400">

              ● LIVE

            </div>

            {/* REC */}
            <div className="absolute bottom-6 right-6 text-3xl text-red-500 animate-pulse">

              ● REC

            </div>

            {/* SIGNAL */}
            <div className="absolute bottom-6 left-6 text-2xl text-cyan-300">

              SIGNAL ▰▰▰▰

            </div>

            {/* TOUCH INFO */}
            <div className="absolute top-6 left-6 text-xl text-cyan-300/70">

              TOUCH SCREEN TO EXIT

            </div>

          </div>

        </div>

      )}

      {/* DIM */}

      <DimOverlay
        mode={dimMode}
        wakeUp={wakeUp}
      />

    </>
  )
}

export default App