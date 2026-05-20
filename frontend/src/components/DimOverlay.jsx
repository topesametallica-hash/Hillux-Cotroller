// frontend/src/components/DimOverlay.jsx

export default function DimOverlay({ mode, wakeUp }) {

  if (mode === 0) return null

  return (
    <div
      onClick={wakeUp}
      className={`
        fixed inset-0 z-[9999] transition-all duration-500

        ${mode === 1
          ? "bg-black/40 pointer-events-none"
          : "bg-black pointer-events-auto"
        }
      `}
    />
  )
}