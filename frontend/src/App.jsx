// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import axios from "axios"

import MainDashboard from "./pages/MainDashboard"
import RelayPage from "./pages/RelayPage"
import CameraPage from "./pages/CameraPage"
import MediaPage from "./pages/MediaPage"
import NavPage from "./pages/NavPage"
import StatusPage from "./pages/StatusPage"
import SettingsPage from "./pages/SettingsPage"
import VehiclePage from "./pages/VehiclePage"

import DimOverlay from "./components/DimOverlay"
import BootScreen from "./components/BootScreen"
import LogsPage from "./pages/LogsPage"

const socket = io("http://127.0.0.1:8000")

function App() {

  const [dimMode, setDimMode] = useState(0)

  const [bootFinished, setBootFinished] = useState(() => {
    return sessionStorage.getItem("bootFinished") === "true"
  })

  const [reverseActive, setReverseActive] = useState(false)

  const [lastIgnition, setLastIgnition] = useState(null)

  const [vehicleState, setVehicleState] = useState({
    acc: false,
    ignition: false,
    reverse: false,
    lights: false,
    handbrake: false,
    brake: false,
    door: false,
    parking_mode: true,
    night_mode: false,
  })

  const applyVehicleState = (data) => {

    setVehicleState(data)

    setReverseActive(data.reverse)

    if (lastIgnition !== null && data.ignition !== lastIgnition) {

      if (data.ignition === false) {
        setDimMode(2)
      }

      if (data.ignition === true) {
        setDimMode(0)
      }
    }

    setLastIgnition(data.ignition)
  }

  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "r" || e.key === "R") {
        setReverseActive(true)
      }

      if (e.key === "f" || e.key === "F") {
        setReverseActive(false)
      }
    }

    window.addEventListener("keydown", handleKey)

    socket.on("connect", () => {
      console.log("APP SOCKET CONNECTED")
    })

    socket.on("reverse_update", (data) => {
      setReverseActive(data.active)
    })

    socket.on("vehicle_update", (data) => {
      applyVehicleState(data)
    })

    return () => {
      window.removeEventListener("keydown", handleKey)
      socket.off("reverse_update")
      socket.off("vehicle_update")
    }

  }, [lastIgnition])

  useEffect(() => {

    const fetchVehicleState = async () => {

      try {

        const response = await axios.get(
          "http://127.0.0.1:8000/vehicle/state"
        )

        setVehicleState(response.data)
        setLastIgnition(response.data.ignition)

      } catch (error) {

        console.error(error)
      }
    }

    fetchVehicleState()

  }, [])

  useEffect(() => {

    if (!bootFinished) {

      const timer = setTimeout(() => {

        sessionStorage.setItem("bootFinished", "true")
        setBootFinished(true)

      }, 5000)

      return () => clearTimeout(timer)
    }

  }, [bootFinished])

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

  if (!bootFinished) {
    return <BootScreen />
  }

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route
  path="/logs"
  element={
    <LogsPage
      onDim={handleDim}
    />
  }
/>

          <Route path="/" element={<MainDashboard onDim={handleDim} />} />

          <Route path="/relays" element={<RelayPage onDim={handleDim} />} />

          <Route path="/cameras" element={<CameraPage onDim={handleDim} />} />

          <Route path="/media" element={<MediaPage onDim={handleDim} />} />

          <Route path="/nav" element={<NavPage onDim={handleDim} />} />

          <Route path="/vehicle" element={<VehiclePage onDim={handleDim} />} />

          <Route path="/status" element={<StatusPage onDim={handleDim} />} />

          <Route path="/settings" element={<SettingsPage onDim={handleDim} />} />

        </Routes>

      </BrowserRouter>

      {vehicleState.night_mode && (

        <div className="fixed inset-0 z-[8000] pointer-events-none bg-black/30">

          <div className="absolute inset-0 bg-orange-900/10" />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 border border-orange-400 text-orange-300 rounded-2xl px-8 py-3 text-xl tracking-[5px] bg-black/60 shadow-[0_0_25px_#ff990080]">
            NIGHT MODE
          </div>

        </div>
      )}

      {(vehicleState.door || vehicleState.handbrake || vehicleState.brake) && (

        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[8500] flex gap-4">

          {vehicleState.door && (
            <div className="border border-yellow-400 text-yellow-400 bg-black/70 rounded-2xl px-8 py-4 text-2xl tracking-[4px] shadow-[0_0_25px_#ffaa00]">
              DOOR OPEN
            </div>
          )}

          {vehicleState.handbrake && (
            <div className="border border-red-400 text-red-400 bg-black/70 rounded-2xl px-8 py-4 text-2xl tracking-[4px] shadow-[0_0_25px_#ff3333]">
              HANDBRAKE
            </div>
          )}

          {vehicleState.brake && (
            <div className="border border-red-400 text-red-400 bg-black/70 rounded-2xl px-8 py-4 text-2xl tracking-[4px] shadow-[0_0_25px_#ff3333]">
              BRAKE
            </div>
          )}

        </div>
      )}

      {vehicleState.parking_mode && !reverseActive && (

        <div className="fixed top-4 right-4 z-[8500] border border-cyan-400 text-cyan-300 bg-black/70 rounded-2xl px-6 py-3 text-xl tracking-[4px] shadow-[0_0_20px_#00ffff80] pointer-events-none">
          PARKING MODE
        </div>
      )}

      {reverseActive && (

        <div
          onClick={() => setReverseActive(false)}
          className="fixed inset-0 z-[9998] bg-black flex items-center justify-center text-cyan-400 cursor-pointer"
        >

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ff2_0%,#000_70%)] opacity-20" />

          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_51%)] bg-[length:100%_3px]" />

          <div className="absolute top-20 text-4xl text-yellow-400 tracking-[8px] animate-pulse">
            REAR CAMERA ACTIVE
          </div>

          <div className="w-[92%] h-[92%] border border-cyan-400 rounded-3xl relative overflow-hidden shadow-[0_0_40px_#00ffff80]">

            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,255,255,0.1), transparent)",
                animation: "cameraMotion 6s linear infinite"
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center text-8xl tracking-[10px] text-cyan-300/70">
              REAR CAMERA
            </div>

            <div className="absolute top-6 right-6 text-3xl text-green-400">
              ● LIVE
            </div>

            <div className="absolute bottom-6 right-6 text-3xl text-red-500 animate-pulse">
              ● REC
            </div>

            <div className="absolute bottom-6 left-6 text-2xl text-cyan-300">
              SIGNAL ▰▰▰▰
            </div>

            <div className="absolute top-6 left-6 text-xl text-cyan-300/70">
              TOUCH SCREEN TO EXIT
            </div>

          </div>

        </div>
      )}

      <DimOverlay
        mode={dimMode}
        wakeUp={wakeUp}
      />

    </>
  )
}

export default App